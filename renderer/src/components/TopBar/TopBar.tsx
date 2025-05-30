import { useRef } from "react";
import { useThemeStore } from "../../zustand/useThemeStore";
import Movie from "../MainPage/components/Movie";
import classesDark from "./TopBarDark.module.scss";
import classesLight from "./TopBarLight.module.scss";

interface TopBarProps {
    onLoadMovie: (movie: Movie) => void;
}

function TopBar({ onLoadMovie }: TopBarProps) {
    const theme = useThemeStore((state) => state.theme);
    const classes = theme === "dark" ? classesDark : classesLight;

    // Ref to access hidden file input
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileButtonClick = () => {
        fileInputRef.current?.click(); // Trigger file input
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target?.result as string);
                console.log("Loaded movie JSON:", json);
                const newMovie = new Movie(
                    json.title,
                    json.year,
                    json.genres,
                    json.rating,
                    json.actors,
                    json.description,
                    json.isBookmarked,
                    json.imgPath
                );

                onLoadMovie(newMovie); // Send movie to MainPage
            } catch (err) {
                alert("Invalid JSON format for movie.");
                console.error(err);
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className={classes.container}>
            <img
                src={theme === "dark" ? "../images/movieIconBlack.png" : "../images/movieIconWhite.png"}
                className={classes.logo}
                alt="Logo"
            />
            <div className={classes.buttons}>
                <button className={classes.loadButton} onClick={handleFileButtonClick}>
                    + Load movie
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
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
