const { ipcMain, BrowserWindow, BrowserView, app } = require('electron');
const path = require('path');
const RPC = require('discord-rpc');

const CLIENT_ID = '1265037894100193440';

let mainWindow;
let browserView;

const rpc = new RPC.Client({ transport: 'ipc' });

rpc.on('ready', () => {
  rpc.setActivity({
    details: 'browsing websites',
    startTimestamp: new Date(),
    largeImageKey: 'browser',
    largeImageText: 'TLCH Browser',
  });
});

rpc.login({ clientId: CLIENT_ID });

function createWindow() {
  mainWindow = new BrowserWindow({
    titleBarStyle: 'default',
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'icon.png'),
  });

  browserView = new BrowserView();
  mainWindow.setBrowserView(browserView);
  updateBrowserViewBounds();
  mainWindow.loadFile('index.html');
  browserView.webContents.loadURL('http://app.tlch');
  mainWindow.on('resize', updateBrowserViewBounds);
  mainWindow.on('move', updateBrowserViewBounds);

  browserView.webContents.on('did-navigate', (event, url) => {
    mainWindow.webContents.send('update-url', url);
    rpc.setActivity({
      details: 'Browsing the web',
      startTimestamp: new Date(),
      largeImageKey: 'browser',
      largeImageText: 'TLCH Browser',
    });
  });

  browserView.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    const errorPageURL = `error.html?code=${errorCode}&message=${encodeURIComponent(errorDescription)}`;
    browserView.webContents.loadURL(`file://${path.join(__dirname, errorPageURL)}`);
  });

  ipcMain.on('navigate', (event, action, url) => {
    switch (action) {
      case 'forward':
        browserView.webContents.goForward();
        break;
      case 'back':
        browserView.webContents.goBack();
        break;
      case 'refresh':
        browserView.webContents.reload();
        break;
      case 'url':
        browserView.webContents.loadURL(url);
        break;
    }
  });
}

function updateBrowserViewBounds() {
  const [width, height] = mainWindow.getSize();
  const { x, y } = mainWindow.getBounds();
  browserView.setBounds({ x: 0, y: 80, width: width, height: height - 80 });
}

app.commandLine.appendSwitch('host-resolver-rules', 'MAP *.tlch 108.217.212.32');

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
