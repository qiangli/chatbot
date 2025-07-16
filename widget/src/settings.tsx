import type { Settings, Theme } from 'react-chatbotify';

import widget_settings from './settings/widget';
import chrome_settings from './settings/chrome';
import vscode_settings from './settings/vscode';

const target = import.meta.env.VITE_CHATBOT_TARGET;

// https://react-chatbotify.com/docs/v2/api/settings
let settings: Settings;
switch (target) {
  case 'chrome-toolbar':
  case 'chrome-sidepanel':
    settings = chrome_settings;
    break;
  case 'vscode-sidebar':
    settings = vscode_settings;
    break;
  case 'electron-tray':
    settings = chrome_settings;
    break;
  case 'web':
    settings = widget_settings;
    break;
  default:
    // settings = widget_settings;
    throw new Error(`invalid target: ${target}`);
}

export default settings;

//
// https://react-chatbotify.com/themes
// https://github.com/react-chatbotify/community-themes/tree/main/themes
// const terminal = [{ id: 'terminal', version: '0.1.0' }];
const soft_sky_blue = [{ id: 'soft_sky_blue', version: '0.1.0' }];
// const themes = [{ id: 'imple_blue', version: '0.1.0' }];
const chatgpt = [{ id: 'chatgpt', version: '0.1.0' }];
const midlight_black = [{ id: 'midlight_black', version: '0.1.0' }];
// const omen = [{ id: 'omen', version: '0.1.0' }];

let themes: Theme | Array<Theme>;
switch (target) {
  case 'chrome-toolbar':
  case 'chrome-sidepanel':
    themes = soft_sky_blue;
    break;
  case 'vscode-sidebar':
    themes = chatgpt;
    break;
  case 'electron-tray':
    themes = midlight_black;
    break;
  default:
    themes = soft_sky_blue;
}

export { themes };
