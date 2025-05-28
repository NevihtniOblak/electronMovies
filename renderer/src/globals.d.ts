export {};

declare global {
    interface Window {
        electronAPI: {
            openSettings: () => void;
        };
    }
}
