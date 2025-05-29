export {};

declare global {
    interface Window {
        electronAPI: {
            openSettings: () => void;
            sendTheme: (theme: string) => void;
            onThemeChanged: (callback: (theme: string) => void) => void;
            removeThemeChangedListener: (callback: (theme: string) => void) => void;
        };
    }
}
