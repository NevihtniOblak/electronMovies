import classes from "./TopBar.module.scss";

function TopBar() {
    return (
        <div className={classes.container}>
            <img src="../public/images/movieIconBlack.png" className={classes.logo}></img>
            <div className={classes.buttons}>
                <button className={classes.loadButton} onClick={() => window.electronAPI.openSettings()}>
                    + Load movie
                </button>
                <img
                    src="../public/images/settingsBlack.png"
                    className={classes.settingsButton}
                    onClick={() => window.electronAPI.openSettings()}
                ></img>
            </div>
        </div>
    );
}

export default TopBar;
