import type { MovieData } from "./types/MovieData"; // Fix import if needed

export {};

declare global {
    interface Window {
        electronAPI: {
            openSettings: () => void;
            sendTheme: (theme: string) => void;
            onThemeChanged: (callback: (theme: string) => void) => void;
            removeThemeChangedListener: (callback: (theme: string) => void) => void;
            getMovies: () => Promise<MovieData[]>;
            setMovies: (movies: MovieData[]) => void;
        };
    }
}
