const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;
let settingsWindow;
let currentTheme = "light"; // Default theme

const createWindow = () => {
    const preloadPath = path.join(__dirname, "preload.js");

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: preloadPath,
            contextIsolation: true,
        },
    });

    if (process.env.NODE_ENV === "development") {
        mainWindow.loadURL("http://localhost:3000");
    } else {
        mainWindow.loadFile("dist/index.html");
    }

    // Once main window is ready, send the current theme
    mainWindow.webContents.on("did-finish-load", () => {
        mainWindow.webContents.send("theme-changed", currentTheme);
    });
};

function createSettingsWindow() {
    if (settingsWindow) return;

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

    settingsWindow.once("ready-to-show", () => {
        settingsWindow.show();

        // Send the current theme when settings window is ready
        settingsWindow.webContents.send("theme-changed", currentTheme);
    });

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
    createSettingsWindow();
});

ipcMain.on("set-theme", (event, theme) => {
    console.log("Theme set to", theme);

    currentTheme = theme; // Update the theme variable

    // Broadcast to all windows
    BrowserWindow.getAllWindows().forEach((win) => {
        win.webContents.send("theme-changed", currentTheme);
    });
});
