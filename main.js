const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const Store = require("electron-store").default;
const store = new Store();

let mainWindow;
let settingsWindow;
let currentTheme = store.get("theme", "light");

const defaultMovies = [
    {
        title: "Angry Birds",
        year: 2016,
        genres: ["Animation", "Comedy"],
        rating: 6.3,
        actors: ["Jason Sudeikis", "Josh Gad"],
        description:
            "Flightless birds living on a peaceful island are thrown into chaos when a group of mysterious green pigs arrive. As suspicions grow, Red and his unlikely allies must uncover the pigs’ secret plan and defend their homeland in an explosive and comically chaotic battle that tests their wits, teamwork, and tempers.",
        isBookmarked: false,
        imgPath: "images/ab.png",
    },
    {
        title: "Minecraft: The Movie",
        year: 2025,
        genres: ["Adventure", "Fantasy"],
        rating: 0,
        actors: ["Jason Momoa", "Jack Black", "Sebastian Hansen"],
        description:
            "Four misfits from different walks of life are unexpectedly pulled through a mysterious portal and find themselves in a surreal blocky realm made entirely of cubes. This strange world, governed by creativity, crafting, and survival, holds many challenges. With the help of a quirky expert builder, they must overcome hostile creatures, uncover ancient secrets, and embrace their imagination in order to forge a path home and maybe even save both worlds in the process.",
        isBookmarked: false,
        imgPath: "images/mm.jpg",
    },
    {
        title: "The Phantom Menace",
        year: 1999,
        genres: ["Sci-Fi", "Action"],
        rating: 6.5,
        actors: ["Liam Neeson", "Ewan McGregor"],
        description:
            "Two Jedi Knights are dispatched to resolve a trade dispute but quickly uncover a darker threat looming in the galaxy. Along the way, they discover a gifted young boy who may hold the key to the galaxy's future. As the sinister Sith emerge from hiding and political tensions escalate, the Jedi must confront their beliefs and make choices that will shape the fate of the Republic for generations to come.",
        isBookmarked: false,
        imgPath: "images/pm.jpeg",
    },
    {
        title: "Spiderman: Homecoming",
        year: 2017,
        genres: ["Action", "Adventure"],
        rating: 7.4,
        actors: ["Tom Holland", "Michael Keaton"],
        description:
            "Peter Parker struggles to balance high school life with his responsibilities as Spider-Man after his thrilling introduction to the Avengers. Eager to prove himself, he faces a dangerous new enemy in the Vulture, who threatens everything Peter holds dear. With the guidance of Tony Stark and the support of his best friend Ned, Peter learns that true heroism goes beyond flashy powers—it's about making the hard choices when no one is watching.",
        isBookmarked: false,
        imgPath: "images/sh.jpg",
    },
    {
        title: "The Matrix",
        year: 1999,
        genres: ["Action", "Sci-Fi"],
        rating: 8.7,
        actors: ["Keanu Reeves", "Laurence Fishburne"],
        description:
            "Thomas Anderson, a quiet programmer by day and underground hacker known as Neo by night, uncovers a disturbing truth: the reality he lives in is an elaborate illusion controlled by artificial intelligence. Pulled into a war between machines and rebels, Neo must decide whether to embrace his destiny as 'The One' and rise against the system, unlocking his mind’s potential to bend the digital world—and possibly save humanity from eternal enslavement.",
        isBookmarked: false,
        imgPath: "images/tm.jpg",
    },
];

if (store.has("movies")) {
    const storedMovies = store.get("movies");
    if (!Array.isArray(storedMovies) || storedMovies.length === 0) {
        store.set("movies", defaultMovies);
    }
} else {
    store.set("movies", defaultMovies);
}

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
        },
        autoHideMenuBar: true,
    });

    if (process.env.NODE_ENV === "development") {
        mainWindow.loadURL("http://localhost:3000");
    } else {
        mainWindow.loadFile("dist/index.html");
    }

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
        autoHideMenuBar: true,
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

    currentTheme = theme;
    store.set("theme", theme);

    BrowserWindow.getAllWindows().forEach((win) => {
        win.webContents.send("theme-changed", currentTheme);
    });
});

ipcMain.handle("get-movies", () => {
    console.log("Current movies:", store.get("movies"));
    return store.get("movies", defaultMovies);
});

ipcMain.on("set-movies", (event, movies) => {
    store.set("movies", movies);
});
