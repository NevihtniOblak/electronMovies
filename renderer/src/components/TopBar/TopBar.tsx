import { useThemeStore } from "../../zustand/useThemeStore";
import classesDark from "./TopBarDark.module.scss";
import classesLight from "./TopBarLight.module.scss";

function TopBar() {
    const theme = useThemeStore((state) => state.theme);
    const classes = theme === "dark" ? classesDark : classesLight;

    return (
        <div className={classes.container}>
            <img
                src={theme === "dark" ? "../images/movieIconBlack.png" : "../images/movieIconWhite.png"}
                className={classes.logo}
                alt="Logo"
            />
            <div className={classes.buttons}>
                <button className={classes.loadButton}>+ Load movie</button>
                <img
                    src={theme === "dark" ? "../images/settingsBlack.png" : "../images/settingsWhite.png"}
                    className={classes.settingsButton}
                    alt="Settings"
                    onClick={() => window.electronAPI.openSettings()}
                />
            </div>
        </div>
    );
}

export default TopBar;
