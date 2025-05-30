import { useState, useEffect } from "react";
import { useThemeStore } from "../../zustand/useThemeStore";
import classesDark from "./SettingsModalDark.module.scss";
import classesLight from "./SettingsModalLight.module.scss";

function SettingsModal() {
    const theme = useThemeStore((state) => state.theme);
    const [selectedTheme, setSelectedTheme] = useState(theme);

    useEffect(() => {
        setSelectedTheme(theme);
    }, [theme]);

    const activeClasses = theme === "dark" ? classesDark : classesLight;

    const saveSettings = () => {
        window.electronAPI.sendTheme(selectedTheme);
    };

    return (
        <div className={activeClasses.container}>
            <div className={activeClasses.upper}>
                <p className={activeClasses.title}>Settings</p>

                <div className={activeClasses.settingsSection}>
                    <div className={activeClasses.settingItem}>
                        <label htmlFor="theme-select">Theme:</label>
                        <select
                            id="theme-select"
                            className={activeClasses.dropdown}
                            value={selectedTheme}
                            onChange={(e) => setSelectedTheme(e.target.value as "light" | "dark")}
                        >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={activeClasses.buttons}>
                <button className={activeClasses.saveButton} onClick={saveSettings}>
                    Save
                </button>
                <button className={activeClasses.cancelButton} onClick={() => window.close()}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default SettingsModal;
