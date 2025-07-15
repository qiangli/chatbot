import type { Settings, Theme } from 'react-chatbotify';

import web_settings from './settings/web';
import chrome_settings from './settings/chrome';
import vscode_settings from './settings/vscode';

const TARGET = import.meta.env.VITE_TARGET;

// https://react-chatbotify.com/docs/v2/api/settings
let settings: Settings;
switch (TARGET) {
  case 'chrome':
    settings = chrome_settings;
    break;
  case 'vscode':
    settings = vscode_settings;
    break;
  default:
    settings = web_settings;
}

export default settings;

//
// https://react-chatbotify.com/themes
// https://github.com/react-chatbotify/community-themes/tree/main/themes
// const terminal = [{ id: 'terminal', version: '0.1.0' }];
const soft_sky_blue = [{ id: 'soft_sky_blue', version: '0.1.0' }];
// const themes = [{ id: 'imple_blue', version: '0.1.0' }];
const chatgpt = [{ id: 'chatgpt', version: '0.1.0' }];
// const midlight_black = [{ id: 'midlight_black', version: '0.1.0' }];
// const omen = [{ id: 'omen', version: '0.1.0' }];

let themes: Theme | Array<Theme>;
switch (TARGET) {
  case 'chrome':
    themes = soft_sky_blue;
    break;
  case 'vscode':
    themes = chatgpt;
    break;
  default:
    themes = soft_sky_blue;
}

export { themes };
