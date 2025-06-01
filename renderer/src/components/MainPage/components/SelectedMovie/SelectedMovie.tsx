import Movie from "../../../../models/Movie";
import { useState } from "react";
import { useThemeStore } from "../../../../zustand/useThemeStore";
import classesDark from "./SelectedMovieDark.module.scss";
import classesLight from "./SelectedMovieLight.module.scss";

type Props = {
    movie: Movie;
    onRemove: (movie: Movie) => void;
    onToggleBookmark: (movie: Movie) => void;
};
function SelectedMovie({ movie, onRemove, onToggleBookmark }: Props) {
    const theme = useThemeStore((state) => state.theme);
    const classes = theme === "dark" ? classesDark : classesLight;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isBookmarked, setIsBookmarked] = useState<boolean>(movie.isBookmarked);

    return (
        <div className={classes.container}>
            <img src={movie.imgPath} alt={movie.title} className={classes.image} />
            <div className={classes.details}>
                <div className={classes.upper}>
                    <p className={classes.title}>{movie.title}</p>
                    <p className={classes.year}>{movie.year}</p>
                    <p className={classes.genres}>{movie.genres.join(", ")}</p>
                    <div className={classes.ratingContainer}>
                        <img src="../public/images/star.png" alt="Rating Star" className={classes.ratingIcon} />
                        <p className={classes.rating}>{movie.rating}</p>
                    </div>
                </div>
                <div className={classes.lower}>
                    <p className={classes.actors}>{movie.actors.join(", ")}</p>
                    <p className={classes.description}>{movie.description}</p>
                </div>
            </div>
            <div className={classes.buttons}>
                <img
                    src={
                        movie.isBookmarked
                            ? theme === "dark"
                                ? "images/BookmarkWhiteFilled.png"
                                : "images/BookmarkBlackFilled.png"
                            : theme === "dark"
                            ? "images/BookmarkWhite.png"
                            : "images/BookmarkBlack.png"
                    }
                    className={classes.bookmarkButton}
                    alt="Bookmark"
                    onClick={() => {
                        onToggleBookmark(movie);
                        setIsBookmarked(movie.isBookmarked);
                    }}
                />

                <img
                    src={theme === "dark" ? "images/eksWhite.png" : "images/eksBlack.png"}
                    alt="Remove movie"
                    className={classes.removeButton}
                    onClick={() => onRemove(movie)}
                    title="Remove movie"
                />
            </div>
        </div>
    );
}

export default SelectedMovie;
