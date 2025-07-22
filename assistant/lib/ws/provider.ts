// provider.ts

import type {
  ThreadMessage as Message,
  ChatModelRunOptions,
  ChatModelAdapter,
  ChatModelRunResult,
} from "@assistant-ui/react";

import type { ThreadUserMessagePart } from "@assistant-ui/react";

import { type WsMessage, sendWsMessage } from "./manager";

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
  private debug: boolean = false;

  public constructor(config: CustomProviderConfig) {
    this.debug = config.debug ?? true;
  }

  public async run(options: ChatModelRunOptions): Promise<ChatModelRunResult> {
    const { messages } = options;
    if (this.debug) {
      console.log("[CustomProvider] Request:", {
        messages: messages,
      });
    }

    // TODO
    // Get only the last message
    const lastMessage = messages.slice(-1);
    if (lastMessage.length === 0) {
      return this.reply("no input");
    }

    for (const msg of lastMessage) {
      if (msg.role !== "user") {
        if (this.debug) {
          console.log("skipping non user message", msg);
        }
        continue;
      }
      return this.handleMessage(msg);
    }

    return this.reply("");
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

  async handleMessage(msg: Message): Promise<ChatModelRunResult> {
    try {
      const resp = await sendMessage(msg);
      if (this.debug) {
        console.log("[CustomProvider] response:", resp);
      }
      return this.reply(resp.payload);
    } catch (err) {
      if (this.debug) {
        console.error("failed to send", err);
      }
      return this.reply(`Failed to send message: ${err}`);
    }
  }
}

function createMessage(id: string, content: string): WsMessage {
  const payload = {
    version: "1",
    format: "chatbot",
    parts: null,
    content: content,
  };

  const msg: WsMessage = {
    id: id,
    type: "hub",
    recipient: "ai",
    payload: JSON.stringify(payload),
  };

  return msg;
}

async function sendMessage(message: Message): Promise<WsMessage> {
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
    message.content.filter(
      (part) => part.type == "text"
    )
  ).join("\n");

  const req = createMessage(
    message.id,
    JSON.stringify({
      content: content,
      parts: parts,
    }),
  );
  const resp = sendWsMessage(req);
  return resp;
}

export default CustomModelAdapter;
