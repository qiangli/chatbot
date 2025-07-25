// main.js
// electron tray main entry
//
const { app, BrowserWindow, Menu, Tray } = require('electron/main')
const { nativeImage } = require('electron/common')
const { exec } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const red = nativeImage.createFromDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACTSURBVHgBpZKBCYAgEEV/TeAIjuIIbdQIuUGt0CS1gW1iZ2jIVaTnhw+Cvs8/OYDJA4Y8kR3ZR2/kmazxJbpUEfQ/Dm/UG7wVwHkjlQdMFfDdJMFaACebnjJGyDWgcnZu1/lrCrl6NCoEHJBrDwEr5NrT6ko/UV8xdLAC2N49mlc5CylpYh8wCwqrvbBGLoKGvz8Bfq0QPWEUo/EAAAAASUVORK5CYII=')
const green = nativeImage.createFromDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACOSURBVHgBpZLRDYAgEEOrEzgCozCCGzkCbKArOIlugJvgoRAUNcLRpvGH19TkgFQWkqIohhK8UEaKwKcsOg/+WR1vX+AlA74u6q4FqgCOSzwsGHCwbKliAF89Cv89tWmOT4VaVMoVbOBrdQUz+FrD6XItzh4LzYB1HFJ9yrEkZ4l+wvcid9pTssh4UKbPd+4vED2Nd54iAAAAAElFTkSuQmCC')

// save a reference to the Tray object globally to avoid garbage collection
let tray = null

function getBaseDir() {
  const base = path.resolve(__dirname, '..');
  const distDir = path.join(base, 'dist');
  return distDir;
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow();
  const baseDir = getBaseDir();
  const tpl = path.join(baseDir, 'index.html');

  // Read and modify the HTML content
  const baseUrl = new URL(`file://${baseDir}/`).href;
  const fs = require('fs');
  fs.readFile(tpl, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    const content = data.replace(/\/\{BASE_URL\}/g, baseUrl);

    // write to a file baseDir + "__index.html"
    const newFilePath = path.join(baseDir, '__index.html');
    fs.writeFile(newFilePath, content, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log(`File has been saved to ${newFilePath}`);
      }
      const htmlFile = path.join(baseDir, '__index.html');
      mainWindow.loadFile(htmlFile);
    });
  });
}

// Object to store the PID of the 'ai' process
let aiProcess = null;

function startHub() {
  tray.setImage(green);

  const homeDir = os.homedir();
  const aiDir = path.join(homeDir, ".ai");

  // Ensure the .ai directory exists
  if (!fs.existsSync(aiDir)) {
    fs.mkdirSync(aiDir);
  }

  const pidFilePath = path.join(aiDir, 'hub.pid');

  try {
    if (fs.existsSync(pidFilePath)) {
      const pid = fs.readFileSync(pidFilePath, 'utf8').trim();
      process.kill(Number(pid));
      console.log(`Terminated previous hub process with PID: ${pid}`);
    }
  } catch (error) {
    console.error(`Error terminating previous process: ${error.message}`);
  }

  //
  const configFilePath = path.join(aiDir, "hub.json");

  // Default configuration settings
  const defaultConfig = {
    program: "ai",
    args: [
      "--agent", "ask",
      "--hub",
      "--hub-address", ":58080",
      "--hub-pg-address", ":25432",
      "--hub-mysql-address", ":3306",
      "--hub-redis-address", ":6379"
    ]
  };

  // Check if hub.json exists, and create it with default settings if not
  if (!fs.existsSync(configFilePath)) {
    fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2), 'utf8');
  }

  // Read configuration from hub.json
  let config = defaultConfig;
  try {
    const configData = fs.readFileSync(configFilePath, 'utf8');
    config = JSON.parse(configData);
  } catch (err) {
    console.error(`Failed to read or parse config file: ${err}`);
  }

  // Construct command from config
  const command = `${config.program} ${config.args.join(' ')}`;
  console.log("hub command", command);

  // Start the external app "ai" and capture the process reference
  try {
    aiProcess = exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing 'ai': ${error.message}`);
        return;
      }
      console.log(`'ai' stdout: ${stdout}`);
    });

    tray.setTitle("AI Hub running");
    console.log(`'ai' started with PID: ${aiProcess.pid}`);
  } catch (error) {
    console.error(`Error starting hub ${error.message}`);
    tray.setTitle("Start failed");
  }

  if (!fs.existsSync(aiDir)) {
    fs.mkdirSync(aiDir);
  }

  fs.writeFile(pidFilePath, aiProcess.pid.toString(), 'utf8', (err) => {
    if (err) {
      console.error(`Failed to write PID to file: ${err}`);
    } else {
      console.log(`PID written to ${pidFilePath}`);
    }
  });
}

function stopHub() {
  tray.setImage(red);
  tray.setTitle('');

  // Kill the 'ai' process using its PID
  if (aiProcess) {
    try {
      process.kill(aiProcess.pid);
      console.log(`'ai' process with PID ${aiProcess.pid} has been terminated`);
      aiProcess = null; // Reset the process reference

      // Remove the PID file if it exists
      const homeDir = os.homedir();
      const pidFilePath = path.join(homeDir, '.ai', 'hub.pid');
      if (fs.existsSync(pidFilePath)) {
        fs.unlinkSync(pidFilePath);
        console.log(`Removed PID file at ${pidFilePath}`);
      }

    } catch (error) {
      console.error(`Error killing 'ai' process: ${error.message}`);
    }
  } else {
    console.error('No process to kill');
  }
}

// The Tray object can only be instantiated after the 'ready' event is fired
app.whenReady().then(() => {

  tray = new Tray(red)
  tray.setToolTip('AI Hub Service')

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'AI Chatbot',
      click: () => {
        const wins = BrowserWindow.getAllWindows()
        if (wins.length === 0) {
          createWindow()
        } else {
          wins[0].focus()
        }
      }
    },
    {
      label: 'Toggle AI Hub Services',
      type: 'checkbox',
      click: ({ checked }) => {
        // checked ? tray.setImage(green) : tray.setImage(red)
        // setStatus(checked);
        if (checked) {
          startHub();
        } else {
          stopHub();
        }
      }
    },
    { role: 'quit' }
  ])

  // tray.setToolTip('AI Hub Service for chatbots');
  tray.setContextMenu(contextMenu);
})

app.on('window-all-closed', function () {
  // This will prevent the app from closing when windows close
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
