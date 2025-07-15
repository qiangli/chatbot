// provider.ts

import { type Provider } from '@rcb-plugins/llm-connector';
import { type Message } from 'react-chatbotify';

import { type WsMessage, sendWsMessage } from './manager';

type CustomProviderConfig = {
  baseUrl?: string;
  debug?: boolean;
  responseFormat?: 'stream' | 'json';
};

/**
 * Provider for AI hub service.
 * https://github.com/qiangli/ai
 * https://github.com/react-chatbotify-plugins/llm-connector.git
 */
export default class CustomProvider implements Provider {
  private debug: boolean = false;

  /**
   * @param config configuration for setup
   */
  public constructor(config: CustomProviderConfig) {
    this.debug = config.debug ?? false;
  }

  /**
   * Streams or batch-calls Openai and yields each chunk (or the full text).
   *
   * @param messages  messages to include in the request
   * @param stream    if true, yields each token as it arrives; if false, yields one full response
   */
  public async *sendMessages(messages: Message[]): AsyncGenerator<string> {
    if (this.debug) {
      console.log('[CustomProvider] Request:', {
        messages: messages,
      });
    }

    // TODO investigate messages contain all history?
    const lastMessage = messages.slice(-1); // Get only the last message
    if (lastMessage.length === 0) {
      yield 'No messages provided';
      return;
    }

    for (const msg of lastMessage) {
      try {
        if (msg.sender !== 'USER') {
          console.log('skipping non user message', msg);
          continue;
        }

        const resp = await sendMessage(msg);

        if (this.debug) {
          console.log('[CustomProvider] Response:', resp);
        }

        yield resp.payload;
      } catch (err) {
        console.error('failed to send', err);
        yield 'Failed to send message';
      }
    }
  }
}

function createMessage(id: string, content: string): WsMessage {
  const payload = {
    version: '1',
    format: 'chatbot',
    parts: null,
    content: content,
  };

  const msg: WsMessage = {
    id: id,
    type: 'hub',
    recipient: 'ai',
    payload: JSON.stringify(payload),
  };

  return msg;
}

function sendMessage(message: Message): Promise<WsMessage> {
  const req = createMessage(message.id, message.content);
  const resp = sendWsMessage(req);
  return resp;
}
