import MovieData from "./types/MovieData";

export {};

declare global {
    interface Window {
        electronAPI: {
            openSettings: () => void;
            sendTheme: (theme: string) => void;
            onThemeChanged: (callback: (theme: string) => void) => void;
            removeThemeChangedListener: (callback: (theme: string) => void) => void;
            loadMovies: () => Promise<MovieData[]>;
            saveMovies: (movies: MovieData[]) => Promise<void>;
        };
    }
}
