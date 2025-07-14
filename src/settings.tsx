import { type Settings, Button } from 'react-chatbotify';

import chatIcon from './assets/icon128.png';
import { FooterNote } from './Footer';

const EMBEDDED = import.meta.env.VITE_EMBEDDED === 'true';

// https://react-chatbotify.com/docs/v2/api/settings
// web app
const web_settings: Settings = {
  general: {
    primaryColor: '#42b0c5',
    secondaryColor: '#491d8d',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', " +
      "'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', " +
      'sans-serif',
    showHeader: true,
    showFooter: true,
    showInputRow: true,
    // actionDisabledIcon: actionDisabledIcon,
    embedded: false,
    flowStartTrigger: 'ON_LOAD',
  },
  tooltip: {
    mode: 'NEVER',
    text: 'AI Chat agent',
  },
  chatButton: {
    icon: chatIcon,
  },
  header: {
    title: 'AI Chatbot',
    showAvatar: true,
    avatar: chatIcon,
    buttons: [
      Button.NOTIFICATION_BUTTON,
      Button.AUDIO_BUTTON,
      Button.CLOSE_CHAT_BUTTON,
    ],
    // closeChatIcon: CloseChatIcon,
  },
  notification: {
    disabled: false,
    defaultToggledOn: true,
    volume: 0.2,
    // icon: NotificationIcon,
    // iconDisabled: NotificationIconDisabled,
    // sound: notificationSound,
    showCount: true,
  },
  audio: {
    disabled: false,
    defaultToggledOn: false,
    language: 'en-US',
    voiceNames: [
      'Microsoft David - English (United States)',
      'Alex (English - United States)',
    ],
    rate: 1,
    volume: 1,
    // icon: AudioIcon,
    // iconDisabled: AudioIconDisabled,
  },
  chatHistory: {
    disabled: true,
    maxEntries: 30,
    storageKey: 'ai-chat-history',
    storageType: 'LOCAL_STORAGE',
    viewChatHistoryButtonText: 'Load Chat History ⟳',
    chatHistoryLineBreakText: '----- Previous Chat History -----',
    autoLoad: false,
  },
  chatInput: {
    disabled: false,
    allowNewline: false,
    enabledPlaceholderText: 'Type your message...',
    disabledPlaceholderText: '',
    showCharacterCount: false,
    characterLimit: -1,
    botDelay: 1000,
    // sendButtonIcon: SendButtonIcon,
    blockSpam: true,
    sendOptionOutput: true,
    sendCheckboxOutput: true,
    buttons: [Button.VOICE_MESSAGE_BUTTON, Button.SEND_MESSAGE_BUTTON],
  },
  chatWindow: {
    showScrollbar: false,
    showTypingIndicator: true,
    autoJumpToBottom: false,
    showMessagePrompt: true,
    messagePromptText: 'New Messages ↓',
    messagePromptOffset: 30,
    defaultOpen: false,
  },
  sensitiveInput: {
    maskInTextArea: true,
    maskInUserBubble: true,
    asterisksCount: 10,
    hideInUserBubble: false,
  },
  userBubble: {
    animate: true,
    showAvatar: false,
    // avatar: userAvatar,
    simulateStream: false,
    streamSpeed: 30,
  },
  botBubble: {
    animate: true,
    showAvatar: false,
    // avatar: botAvatar,
    simulateStream: false,
    streamSpeed: 30,
  },
  voice: {
    disabled: true,
    defaultToggledOn: false,
    language: 'en-US',
    timeoutPeriod: 10000,
    autoSendDisabled: false,
    autoSendPeriod: 1000,
    sendAsAudio: false,
    // icon: VoiceIcon,
    // iconDisabled: VoiceIconDisabled,
  },
  footer: {
    text: <FooterNote />,
    buttons: [Button.FILE_ATTACHMENT_BUTTON, Button.EMOJI_PICKER_BUTTON],
  },
  fileAttachment: {
    disabled: false,
    multiple: true,
    accept: '.jpg, .png, .txt, .md',
    // icon: FileAttachmentIcon,
    // iconDisabled: FileAttachmentIcon,
    sendFileName: true,
    showMediaDisplay: true,
  },
  emoji: {
    disabled: false,
    // icon: EmojiIcon,
    // iconDisabled: EmojiIcon,
    // list: ["😀", "😃", "😄", "😅", "😊", "😌", "😇", "🙃", "🤣", "😍", "🥰", "🥳", "🎉", "🎈", "🚀", "⭐️"]
    list: ['😀', '🙂', '🙃', '👍', '🎉', '🎈', '🚀', '⭐️'],
  },
  toast: {
    maxCount: 3,
    forbidOnMax: false,
    dismissOnClick: true,
  },
  event: {
    rcbPreInjectMessage: false,
    rcbPostInjectMessage: false,
    rcbStartSimulateStreamMessage: false,
    rcbStopSimulateStreamMessage: false,
    rcbStartStreamMessage: false,
    rcbChunkStreamMessage: false,
    rcbStopStreamMessage: false,
    rcbRemoveMessage: false,
    rcbLoadChatHistory: false,
    rcbToggleChatWindow: false,
    rcbToggleAudio: false,
    rcbToggleNotifications: false,
    rcbToggleVoice: false,
    rcbChangePath: false,
    rcbShowToast: false,
    rcbDismissToast: false,
    rcbUserSubmitText: false,
    rcbUserUploadFile: false,
    rcbTextAreaChangeValue: false,
    rcbPreLoadChatBot: false,
    rcbPostLoadChatBot: false,
  },
  ariaLabel: {
    chatButton: 'open chat',
    audioButton: 'toggle audio',
    closeChatButton: 'close chat',
    emojiButton: 'emoji picker',
    fileAttachmentButton: 'upload file',
    notificationButton: 'toggle notifications',
    sendButton: 'send message',
    voiceButton: 'toggle voice',
    inputTextArea: 'input text area',
  },
  device: {
    desktopEnabled: true,
    mobileEnabled: true,
    applyMobileOptimizations: true,
  },
};

// chrome extension
const ext_settings: Settings = {
  general: {
    primaryColor: '#42b0c5',
    secondaryColor: '#491d8d',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', " +
      "'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', " +
      'sans-serif',
    showHeader: true,
    showFooter: true,
    showInputRow: true,
    // actionDisabledIcon: actionDisabledIcon,
    embedded: true,
    flowStartTrigger: 'ON_LOAD',
  },
  tooltip: {
    mode: 'NEVER',
    text: 'AI Chat agent',
  },
  chatButton: {
    icon: chatIcon,
  },
  header: {
    title: '',
    showAvatar: false,
    avatar: chatIcon,
    buttons: [Button.NOTIFICATION_BUTTON, Button.AUDIO_BUTTON],
    // closeChatIcon: CloseChatIcon,
  },
  notification: {
    disabled: false,
    defaultToggledOn: true,
    volume: 0.2,
    // icon: NotificationIcon,
    // iconDisabled: NotificationIconDisabled,
    // sound: notificationSound,
    showCount: true,
  },
  audio: {
    disabled: false,
    defaultToggledOn: false,
    language: 'en-US',
    voiceNames: [
      'Microsoft David - English (United States)',
      'Alex (English - United States)',
    ],
    rate: 1,
    volume: 1,
    // icon: AudioIcon,
    // iconDisabled: AudioIconDisabled,
  },
  chatHistory: {
    disabled: true,
    maxEntries: 30,
    storageKey: 'ai-chat-history',
    storageType: 'LOCAL_STORAGE',
    viewChatHistoryButtonText: 'Load Chat History ⟳',
    chatHistoryLineBreakText: '----- Previous Chat History -----',
    autoLoad: false,
  },
  chatInput: {
    disabled: false,
    allowNewline: false,
    enabledPlaceholderText: 'Type your message...',
    disabledPlaceholderText: '',
    showCharacterCount: false,
    characterLimit: -1,
    botDelay: 1000,
    // sendButtonIcon: SendButtonIcon,
    blockSpam: true,
    sendOptionOutput: true,
    sendCheckboxOutput: true,
    buttons: [Button.VOICE_MESSAGE_BUTTON, Button.SEND_MESSAGE_BUTTON],
  },
  chatWindow: {
    showScrollbar: false,
    showTypingIndicator: true,
    autoJumpToBottom: false,
    showMessagePrompt: true,
    messagePromptText: 'New Messages ↓',
    messagePromptOffset: 30,
    defaultOpen: false,
  },
  sensitiveInput: {
    maskInTextArea: true,
    maskInUserBubble: true,
    asterisksCount: 10,
    hideInUserBubble: false,
  },
  userBubble: {
    animate: true,
    showAvatar: false,
    // avatar: userAvatar,
    simulateStream: false,
    streamSpeed: 30,
  },
  botBubble: {
    animate: true,
    showAvatar: false,
    // avatar: botAvatar,
    simulateStream: false,
    streamSpeed: 30,
  },
  voice: {
    disabled: true,
    defaultToggledOn: false,
    language: 'en-US',
    timeoutPeriod: 10000,
    autoSendDisabled: false,
    autoSendPeriod: 1000,
    sendAsAudio: false,
    // icon: VoiceIcon,
    // iconDisabled: VoiceIconDisabled,
  },
  footer: {
    text: <FooterNote />,
    buttons: [Button.FILE_ATTACHMENT_BUTTON, Button.EMOJI_PICKER_BUTTON],
  },
  fileAttachment: {
    disabled: false,
    multiple: true,
    accept: '.jpg, .png, .txt, .md',
    // icon: FileAttachmentIcon,
    // iconDisabled: FileAttachmentIcon,
    sendFileName: true,
    showMediaDisplay: true,
  },
  emoji: {
    disabled: false,
    // icon: EmojiIcon,
    // iconDisabled: EmojiIcon,
    // list: ["😀", "😃", "😄", "😅", "😊", "😌", "😇", "🙃", "🤣", "😍", "🥰", "🥳", "🎉", "🎈", "🚀", "⭐️"]
    list: ['😀', '🙂', '🙃', '👍', '🎉', '🎈', '🚀', '⭐️'],
  },
  toast: {
    maxCount: 3,
    forbidOnMax: false,
    dismissOnClick: true,
  },
  event: {
    rcbPreInjectMessage: false,
    rcbPostInjectMessage: false,
    rcbStartSimulateStreamMessage: false,
    rcbStopSimulateStreamMessage: false,
    rcbStartStreamMessage: false,
    rcbChunkStreamMessage: false,
    rcbStopStreamMessage: false,
    rcbRemoveMessage: false,
    rcbLoadChatHistory: false,
    rcbToggleChatWindow: false,
    rcbToggleAudio: false,
    rcbToggleNotifications: false,
    rcbToggleVoice: false,
    rcbChangePath: false,
    rcbShowToast: false,
    rcbDismissToast: false,
    rcbUserSubmitText: false,
    rcbUserUploadFile: false,
    rcbTextAreaChangeValue: false,
    rcbPreLoadChatBot: false,
    rcbPostLoadChatBot: false,
  },
  ariaLabel: {
    chatButton: 'open chat',
    audioButton: 'toggle audio',
    closeChatButton: 'close chat',
    emojiButton: 'emoji picker',
    fileAttachmentButton: 'upload file',
    notificationButton: 'toggle notifications',
    sendButton: 'send message',
    voiceButton: 'toggle voice',
    inputTextArea: 'input text area',
  },
  device: {
    desktopEnabled: true,
    mobileEnabled: true,
    applyMobileOptimizations: true,
  },
};

let settings: Settings;

if (EMBEDDED) {
  settings = ext_settings;
} else {
  settings = web_settings;
}

export default settings;
