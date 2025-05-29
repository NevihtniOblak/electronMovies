import Movie from "../Movie";
import { useState } from "react";
import classes from "./SelectedMovie.module.scss";

type Props = {
    movie: Movie;
};

function SelectedMovie({ movie }: Props) {
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
            <img
                src={movie.isBookmarked ? "images/BookmarkWhiteFilled.png" : "images/BookmarkWhite.png"}
                className={classes.bookmarkButton}
                alt="Bookmark"
                onClick={() => {
                    movie.isBookmarked = !movie.isBookmarked;
                    setIsBookmarked(movie.isBookmarked);
                }}
            />
        </div>
    );
}

export default SelectedMovie;
