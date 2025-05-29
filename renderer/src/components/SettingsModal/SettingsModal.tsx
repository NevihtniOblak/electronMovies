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

    // Pick the styles based on the current theme in global state
    const activeClasses = theme === "dark" ? classesDark : classesLight;

    const saveSettings = () => {
        window.electronAPI.sendTheme(selectedTheme);
        // TODO: send other settings as needed
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
                            value={selectedTheme} // Use selectedTheme to reflect UI change
                            onChange={(e) => setSelectedTheme(e.target.value as "light" | "dark")}
                        >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>

                    <div className={activeClasses.settingItem}>
                        <label>
                            <input type="checkbox" id="voice-commands" />
                            Voice Commands
                        </label>
                    </div>

                    <div className={activeClasses.settingItem}>
                        <label>
                            <input type="checkbox" id="auto-save" />
                            Auto Save
                        </label>
                    </div>
                </div>
            </div>
            <div className={activeClasses.buttons}>
                <button className={activeClasses.saveButton} onClick={saveSettings}>
                    Save
                </button>
                <button
                    className={activeClasses.cancelButton}
                    /* onClick={() => window.electronAPI.closeSettings()} */
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default SettingsModal;
