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

import { type WsMessage, streamWsMessage } from "./manager";

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

  public async *run(
    options: ChatModelRunOptions,
  ): AsyncGenerator<ChatModelRunResult> {
    const { messages, abortSignal } = options;

    this.log("[CustomProvider] Request:", { messages: messages });

    if (abortSignal.aborted) {
      this.log("[CustomProvider] abort signal");
      yield this.reply("Request aborted");
      return;
    }

    try {
      const lastMessage = messages.slice(-1);
      if (lastMessage.length === 0) {
        yield this.reply("no input");
        return;
      }

      for (const msg of lastMessage) {
        if (msg.role !== "user") {
          this.log("skipping non user message", msg);
          continue;
        }

        let text = "";
        for await (const part of streamMessage(msg, abortSignal)) {
          text += part.payload;
          yield { content: [{ type: "text", text }] };
        }

        return;
      }
      yield this.reply("");
    } catch (err) {
      console.error("Failed to send", err);
      yield this.reply(`Failed to send: ${err}`);
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

function createWsMessage(message: Message): WsMessage {
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

  const req: WsMessage = {
    id: uuidv4(),
    type: "hub",
    recipient: "ai",
    action: "run",
    payload: JSON.stringify({
      version: "1",
      format: "chatbot",
      id: message.id,
      content: content,
      parts: parts,
    }),
  };

  return req;
}

async function* streamMessage(msg: Message, signal: AbortSignal) {
  const req = createWsMessage(msg);
  const stream = await streamWsMessage(req, signal);
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

export default CustomModelAdapter;
