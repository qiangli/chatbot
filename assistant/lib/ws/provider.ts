// provider.ts
"use client";

import type {
  ThreadMessage as Message,
  ChatModelRunOptions,
  ChatModelAdapter,
  ChatModelRunResult,
  ThreadUserMessagePart,
} from "@assistant-ui/react";
import { v4 as uuidv4 } from "uuid";

import { type WsMessage, cancelWsMessage, sendWsMessage } from "./manager";

type CustomProviderConfig = {
  baseUrl?: string;
  debug?: boolean;
  responseFormat?: "stream" | "json";
};

/**
 * Provider for AI hub service.
 * https://github.com/qiangli/ai
 * https://www.assistant-ui.com/docs/runtimes/custom/local
 * https://www.assistant-ui.com/docs/runtimes/custom/local#localruntimeoptions
 */
class CustomModelAdapter implements ChatModelAdapter {
  // console log on/off
  private debug: boolean = false;

  public constructor(config: CustomProviderConfig) {
    this.debug = config.debug ?? true;
  }

  log(message?: string, ...params: unknown[]) {
    if (this.debug) {
      console.log(message, params);
    }
  }

  public async run(options: ChatModelRunOptions): Promise<ChatModelRunResult> {
    const { messages, abortSignal } = options;

    this.log("[CustomProvider] Request:", { messages: messages });

    // Error handling for when the operation is aborted
    if (abortSignal.aborted) {
      this.log("[CustomProvider] abort signal");
      return this.reply("Request aborted");
    }

    // send/cancel message id
    const id = uuidv4();

    // Listen for the abort event
    const abortHandler = () => {
      this.log("[CustomProvider] canceling...");
      const resp = cancelMessage(id);
      this.log("[CustomProvider] cancel response:", resp);
    };

    abortSignal.addEventListener("abort", abortHandler);

    try {
      const lastMessage = messages.slice(-1);
      if (lastMessage.length === 0) {
        return this.reply("no input");
      }

      for (const msg of lastMessage) {
        if (msg.role !== "user") {
          this.log("skipping non user message", msg);
          continue;
        }

        const resp = await sendMessage(id, msg);
        this.log("[CustomProvider] send response:", resp);

        return this.reply(resp.payload);
      }

      return this.reply("");
    } catch (err) {
      console.error("Failed to send", err);
      return this.reply(`Failed to send: ${err}`);
    } finally {
      abortSignal.removeEventListener("abort", abortHandler);
    }
  }

  reply(text: string) {
    return Promise.resolve({
      content: [
        {
          type: "text",
          text: text,
        },
      ],
    }) as Promise<ChatModelRunResult>;
  }
}

function createMessage(id: string, payload: string): WsMessage {
  const msg: WsMessage = {
    id: id,
    type: "hub",
    recipient: "ai",
    payload: payload,
  };

  return msg;
}

async function sendMessage(id: string, message: Message): Promise<WsMessage> {
  // Convert message parts to a text content appropriate for websocket message
  const c2s = (tm: ThreadUserMessagePart[]) => {
    return tm.map((part) => {
      switch (part.type) {
        case "text":
          return part.text;
        case "image":
          return part.image;
        case "file":
          return part.data;
        case "audio":
          return part.audio.data;
      }
    });
  };

  const parts: { contentType: string; content: string }[] = [];
  message.attachments?.map((part) => {
    // assume one
    parts.push({
      contentType: part.contentType,
      content: c2s(part.content)[0],
    });
  });

  const content = c2s(
    message.content.filter((part) => part.type == "text"),
  ).join("\n");

  const req = createMessage(
    id,
    JSON.stringify({
      version: "1",
      format: "chatbot",
      id: message.id,
      content: content,
      parts: parts,
    }),
  );

  const resp = sendWsMessage(req);
  return resp;
}

function cancelMessage(id: string) {
  const req: WsMessage = {
    id: id,
    type: "hub",
    recipient: "ai",
    action: "cancel",
    payload: "{}",
  };

  cancelWsMessage(req);
}

export default CustomModelAdapter;
