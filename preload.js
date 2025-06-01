// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    openSettings: () => {
        ipcRenderer.send("open-settings");
    },
    sendTheme: (theme) => {
        ipcRenderer.send("set-theme", theme);
    },

    onThemeChanged: (callback) => {
        ipcRenderer.on("theme-changed", (_event, theme) => {
            callback(theme);
        });
    },
    removeThemeChangedListener: (callback) => {
        ipcRenderer.removeListener("theme-changed", callback);
    },
    getMovies: () => ipcRenderer.invoke("get-movies"),
    setMovies: (movies) => ipcRenderer.send("set-movies", movies),
});
