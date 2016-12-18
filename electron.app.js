const path = require('path');
const url = require('url');
const electron = require('electron');
const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        toolbox: false,
        width: 400,
        height: 540,
        resizable: false,
    });

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
