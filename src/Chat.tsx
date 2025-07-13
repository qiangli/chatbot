import ChatBot, { type Message, ChatBotProvider } from "react-chatbotify";
import LlmConnector, { type LlmConnectorBlock } from "@rcb-plugins/llm-connector";

import CustomProvider from "./ws/provider"
import chatIcon from './assets/icon128.png'
import Hub from './Hub'

const GithubButton = () => {
	return (
		<span>
			<div className="pt-button-group pt-large" style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
				<a href="https://github.com/qiangli/ai" target="_blank" style={{ display: 'flex', alignItems: 'center' }}>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
						<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
					</svg>
					<span style={{ marginLeft: '2px' }}>Github</span>
				</a>
			</div>
		</span>
	);
};

// https://react-chatbotify.com/docs/v2/api/settings
const settings = {
	chatButton: {
		icon: chatIcon,
	},
	tooltip: {
		mode: "NEVER",
		text: "AI chat agent",
	},
	general: {
		primaryColor: '#42b0c5',
		secondaryColor: '#491d8d',
		fontFamily: 'Arial, sans-serif',
		embedded: false
	},
	header: {
		title: "AI Chatbot",
		avatar: chatIcon,
	},
	footer: {
		text: <GithubButton />
	},
	audio: {
		disabled: false,
	},
	chatHistory: {
		disabled: true,
		storageKey: "ai_chatbot_history"
	},
	fileAttachment: {
		disabled: false,
		multiple: true,
		accept: ".jpg, .png, .txt, .md",
		sendFileName: true,
		showMediaDisplay: true
	}
};

// https://www.freecodecamp.org/news/how-to-create-a-react-chatbot/
const Chat = () => {
	const pluginConfig = {
		autoConfig: true,
	}

	const flow = {
		start: {
			message: "What would you like to find out today?",
			transition: 0,
			path: "llm_chat_block",
		},
		llm_chat_block: {
			llmConnector: {
				provider: new CustomProvider({ debug: true }),
				outputType: "full",
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
			message: "The LLM conversation has ended!",
			chatDisabled: true,
			options: ["Try Again"],
			path: "llm_chat_block",
		}
	};

	return (
		<>
			<ChatBotProvider>
				<Hub url={'ws://localhost:58080/hub'} sender={'chatbot-pop'} />
				<ChatBot plugins={[LlmConnector(pluginConfig)]} flow={flow} settings={settings} />
			</ChatBotProvider>
		</>
	)
}

export default Chat