import { type Settings } from 'react-chatbotify';

import web_settings from './settings/web';
import chrome_settings from './settings/chrome';
import vscode_settings from './settings/vscode';

const TARGET = import.meta.env.VITE_TARGET;

// https://react-chatbotify.com/docs/v2/api/settings
let settings: Settings;

if (TARGET === 'chrome') {
  settings = chrome_settings;
} else if (TARGET === 'vscode') {
  settings = vscode_settings;
} else {
  settings = web_settings;
}

export default settings;
