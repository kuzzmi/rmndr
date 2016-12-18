const path = require('path');
const url = require('url');
const electron = require('electron');
const app = electron.app;

const config = require('./electron.config');

const BrowserWindow = electron.BrowserWindow;

const browserWindowConfig = config.all.window;
browserWindowConfig.backgroundColor = '#FCFBFC';

let mainWindow;

const bindConfigToEvents = window => {
    window.on('maximize', () => {
        config.set('window.maximized', true);
    });

    window.on('resize', () => {
        const bounds = window.getBounds();
        config.set('window.width', bounds.width);
        config.set('window.height', bounds.height);
    });

    window.on('move', () => {
        const bounds = window.getBounds();
        config.set('window.x', bounds.x);
        config.set('window.y', bounds.y);
    });

    window.on('unmaximize', () => {
        config.set('window.maximized', false);
    });
};

function createWindow() {
    mainWindow = new BrowserWindow(browserWindowConfig);

    bindConfigToEvents(mainWindow);

    if (config.get('window.maximized')) {
        mainWindow.maximize();
    }

    mainWindow.setMenu(null);

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.desktop.html'),
        protocol: 'file:',
        slashes: true,
    }));

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow();
    }
});
