const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow; // <-- Declare the main window
let settingsWindow; // <-- Declare the settings window

const createWindow = () => {
    const preloadPath = path.join(__dirname, "preload.js");
    console.log("Preload path:", preloadPath);

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: preloadPath,
        },
    });

    mainWindow.webContents.openDevTools();

    if (process.env.NODE_ENV === "development") {
        mainWindow.loadURL("http://localhost:3000");
    } else {
        mainWindow.loadFile("dist/index.html");
    }
};

function createSettingsWindow() {
    console.log("Creating settings window...");
    if (settingsWindow) return; // Prevent multiple modals

    settingsWindow = new BrowserWindow({
        width: 400,
        height: 300,
        parent: mainWindow,
        modal: true,
        resizable: true,
        movable: true,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
        },
    });

    const url =
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000/#/settings"
            : `file://${__dirname}/dist/index.html#/settings`;

    settingsWindow.loadURL(url);

    settingsWindow.once("ready-to-show", () => settingsWindow.show());

    settingsWindow.on("closed", () => {
        settingsWindow = null;
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcMain.on("open-settings", () => {
    console.log("Received request to open settings window");
    createSettingsWindow();
});
