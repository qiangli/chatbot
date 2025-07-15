import ChatBot, { type Message, ChatBotProvider } from 'react-chatbotify';
import LlmConnector, {
  type LlmConnectorBlock,
} from '@rcb-plugins/llm-connector';

import CustomProvider from './ws/provider';
import Hub from './Hub';
import Header from './Header';
import Footer from './Footer';
import settings from './settings';

const slots = {
  chatBotHeader: Header,
  chatBotFooter: Footer,
};

// https://react-chatbotify.com/themes
// https://github.com/react-chatbotify/community-themes/tree/main/themes
// const themes = [{ id: 'terminal', version: '0.1.0' }];
const themes = [{ id: 'chatgpt', version: '0.1.0' }];
// const themes = [{ id: 'midlight_black', version: '0.1.0' }];
// const themes = [{ id: 'omen', version: '0.1.0' }];

// https://github.com/react-chatbotify/react-chatbotify
// https://react-chatbotify.com/docs/v2/introduction/quickstart/
// https://www.freecodecamp.org/news/how-to-create-a-react-chatbot/
const Chat = () => {
  const pluginConfig = {
    autoConfig: true,
  };

  const flow = {
    start: {
      message: 'What would you like to find out today?',
      transition: 0,
      path: 'llm_chat_block',
    },
    llm_chat_block: {
      llmConnector: {
        provider: new CustomProvider({ debug: true }),
        outputType: 'full',
        historySize: 1,
      },
      stopConditoins: {
        onUserMessage: (message: Message) => {
          if (
            typeof message.content === 'string' &&
            message.content.toUpperCase() === 'FINISH'
          ) {
            return 'start';
          }
        },
        onKeyDown: (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            return 'start';
          }
          return null;
        },
      },
    } as LlmConnectorBlock,
    exit_block: {
      message: 'The LLM conversation has ended!',
      chatDisabled: true,
      options: ['Try Again'],
      path: 'llm_chat_block',
    },
  };

  return (
    <>
      <ChatBotProvider>
        <Hub url={'ws://localhost:58080/hub'} sender={'chatbot-pop'} />
        <ChatBot
          plugins={[LlmConnector(pluginConfig)]}
          flow={flow}
          themes={themes}
          settings={settings}
          slots={slots}
        />
      </ChatBotProvider>
    </>
  );
};

export default Chat;
