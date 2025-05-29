// src/store/useThemeStore.ts
import { create } from "zustand";

type Theme = "light" | "dark"; // or more themes if needed

interface ThemeState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme: "light",
    setTheme: (theme) => set({ theme }),
}));
