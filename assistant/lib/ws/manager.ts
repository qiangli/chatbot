// manager.ts
"use client";

import { v4 as uuidv4 } from "uuid";

/**
 * Message format
 * https://github.com/qiangli/ai/blob/main/internal/hub/api/message.go
 */
type WsMessage = {
  type: string;
  recipient: string;
  payload: string;

  id?: string;
  sender?: string;
  action?: string;
  reference?: string;
  code?: string;
  timestamp?: string;
};

const HEART_RATE = 10 * 1000;
const INITIAL_BACKOFF = 3000; // start at 3s
const MAX_BACKOFF = 60 * 1000; // max 1 minute

const RESPONSE_TIMEOUT = 20000; // 20 seconds

class WSManager {
  private webSocket: WebSocket | null = null;
  private keepAliveIntervalId: ReturnType<typeof setInterval> | null = null;
  private reconnectTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private reconnectBackoff = INITIAL_BACKOFF;

  private sender!: string;
  private hubUrl!: string;

  // Map to store pending requests
  private pending: Record<
    string,
    {
      resolve: (value: WsMessage) => void;
      reject: (reason?: string) => void;
      timeout?: ReturnType<typeof setTimeout>;
    }
  > = {};

  setUrl(url: string) {
    this.hubUrl = url;
  }

  setSender(sender: string) {
    this.sender = sender;
  }

  connect(userInitiated = false) {
    if (!this.hubUrl || !this.sender) {
      console.log("hubUrl or sender not set, skip connect");
      return;
    }
    if (
      this.webSocket &&
      (this.webSocket.readyState === WebSocket.CONNECTING ||
        this.webSocket.readyState === WebSocket.OPEN)
    )
      return;

    this.cleanup();

    try {
      this.webSocket = new WebSocket(this.hubUrl + "?auth=1");
    } catch (e) {
      console.warn("websocket", e);
    }

    if (!this.webSocket) return;

    this.webSocket.onopen = () => {
      this.reconnectBackoff = INITIAL_BACKOFF; // Reset backoff

      this.sendRegister();

      this.startKeepAlive();
      console.log("[WS] Connected and registered.");
    };

    this.webSocket.onmessage = (event: MessageEvent) => {
      console.log("[WS] Dispatching event", event.data);
      this.dispatchMessage(event);
    };

    this.webSocket.onclose = (evt: CloseEvent) => {
      console.warn(`[WS] Closed (reason: ${evt.reason || "n/a"})`);
      this.handleDisconnect(false);
    };

    this.webSocket.onerror = (e: Event) => {
      console.warn("[WS] WebSocket error:", e);
      this.handleDisconnect(false);
    };

    if (userInitiated) {
      this.startKeepAlive();
    }
  }

  disconnect(stopKeepAlive = false) {
    if (this.webSocket) {
      try {
        this.webSocket.close();
      } catch (e) {
        console.warn(e);
      }
      this.webSocket.onclose =
        this.webSocket.onmessage =
        this.webSocket.onerror =
          null;
      this.webSocket = null;
    }
    if (stopKeepAlive) this.stopKeepAliveInterval();
    this.clearReconnectTimeout();
    console.log("[WS] Disconnected.");
  }

  startKeepAlive() {
    if (!this.keepAliveIntervalId) {
      this.keepAliveIntervalId = setInterval(this.sendHeartbeat, HEART_RATE);
    }
  }

  stopKeepAliveInterval() {
    if (this.keepAliveIntervalId) {
      clearInterval(this.keepAliveIntervalId);
      this.keepAliveIntervalId = null;
    }
  }

  sendRegister() {
    if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
      this.webSocket.send(
        JSON.stringify({ type: "register", sender: this.sender }),
      );
    }
  }

  sendHeartbeat = () => {
    if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
      try {
        this.webSocket.send(
          JSON.stringify({ type: "heartbeat", sender: this.sender }),
        );
        console.debug("[WS] Sent heartbeat");
      } catch (err) {
        console.warn("[WS] Heartbeat error:", err);
      }
    } else {
      this.handleDisconnect(false);
    }
  };

  clearReconnectTimeout() {
    if (this.reconnectTimeoutId) {
      clearTimeout(this.reconnectTimeoutId);
      this.reconnectTimeoutId = null;
    }
  }

  handleDisconnect(intentional: boolean) {
    this.stopKeepAliveInterval();
    this.clearReconnectTimeout();

    if (!intentional) {
      this.reconnectTimeoutId = setTimeout(() => {
        console.log(`[WS] Attempting reconnect...`);
        this.connect();
      }, this.reconnectBackoff);
      this.reconnectBackoff = Math.min(MAX_BACKOFF, this.reconnectBackoff * 2);
    }
    this.cleanup();
  }

  cleanup() {
    if (this.webSocket) {
      try {
        this.webSocket.close();
      } catch (e) {
        console.warn(e);
      }
      // this.webSocket.onclose =
      //   this.webSocket.onmessage =
      //   this.webSocket.onerror =
      //   null;
      this.webSocket = null;
    }
  }

  // send request and wait for response
  sendWsMessage = (message: WsMessage): Promise<WsMessage> => {
    message.sender = this.sender;

    return new Promise((resolve, reject) => {
      if (!this.webSocket || this.webSocket.readyState !== WebSocket.OPEN) {
        reject(new Error("Service unavailable. Please try again later."));
        return;
      }

      if (!message.sender) {
        reject(new Error("Sender is not set"));
        return;
      }
      if (!message.id) {
        message.id = uuidv4();
      }
      this.pending[message.id] = {
        resolve,
        reject,
        timeout: setTimeout(() => {
          if (message.id) {
            delete this.pending[message.id];
          }

          reject(new Error("Timeout waiting for response"));
        }, RESPONSE_TIMEOUT),
      };

      console.log("[WS] sending:", message);
      this.webSocket.send(JSON.stringify(message));
    });
  };

  dispatchMessage(event: MessageEvent) {
    try {
      const msg: WsMessage = JSON.parse(event.data);
      const key = msg.reference;
      if (key && msg.type === "response" && this.pending[key]) {
        this.pending[key].resolve(msg);
        clearTimeout(this.pending[key].timeout);
        delete this.pending[key];
      } else {
        console.log("[WS] discarded", msg);
      }
    } catch (e) {
      console.warn(e);
    }
  }

  // start or restart hub
  startHub(url: string, sender: string) {
    const senderId = `${sender}-${uuidv4()}`;

    this.setUrl(url);
    this.setSender(senderId);
    if (this.webSocket) {
      this.disconnect(true /* intentional */);
    }
    this.connect(true /* userInitiated */);
  }

  // stop hub
  stopHub() {
    if (this.webSocket) {
      this.disconnect(true /* intentional */);
    }
  }
}

const wsManager = new WSManager();

const sendWsMessage = wsManager.sendWsMessage;

export { wsManager as default, type WsMessage, sendWsMessage };
