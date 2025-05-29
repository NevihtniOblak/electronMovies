import { HashRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import SettingsModal from "./components/SettingsModal/SettingsModal";
import { useThemeStore } from "./zustand/useThemeStore";
import { useEffect } from "react";

function App() {
    const setTheme = useThemeStore((state) => state.setTheme);

    useEffect(() => {
        const handleThemeChange = (theme: string) => {
            setTheme(theme as "light" | "dark");
        };

        window.electronAPI?.onThemeChanged(handleThemeChange);

        return () => {
            window.electronAPI?.removeThemeChangedListener(handleThemeChange);
        };
    }, [setTheme]);
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/settings" element={<SettingsModal />} />
            </Routes>
        </HashRouter>
    );
}
export default App;
