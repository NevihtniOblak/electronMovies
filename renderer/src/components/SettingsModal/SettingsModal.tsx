// SettingsPage.tsx
import classes from "./SettingsModal.module.scss";

function SettingsModal() {
    return (
        <div className={classes.container}>
            <div className={classes.upper}>
                <p className={classes.title}>Settings</p>

                <div className={classes.settingsSection}>
                    <div className={classes.settingItem}>
                        <label htmlFor="theme-select">Theme:</label>
                        <select id="theme-select" className={classes.dropdown}>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>

                    <div className={classes.settingItem}>
                        <label>
                            <input type="checkbox" id="voice-commands" />
                            Voice Commands
                        </label>
                    </div>

                    <div className={classes.settingItem}>
                        <label>
                            <input type="checkbox" id="auto-save" />
                            Auto Save
                        </label>
                    </div>
                </div>
            </div>
            <div className={classes.buttons}>
                <button className={classes.saveButton} /*onClick={() => window.electronAPI.saveSettings()}*/>
                    Save
                </button>
                <button className={classes.cancelButton} /*onClick={() => window.electronAPI.closeSettings()}*/>
                    Close
                </button>
            </div>
        </div>
    );
}

export default SettingsModal;
