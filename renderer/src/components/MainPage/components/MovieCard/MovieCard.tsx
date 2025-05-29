import Movie from "../Movie";
import classes from "./MovieCard.module.scss";

type MoivieCardProps = {
    movie: Movie;
    onClick?: () => void;
};

function MovieCard({ movie, onClick }: MoivieCardProps) {
    return (
        <div className={classes.movieCard} onClick={onClick}>
            <img src={movie.imgPath} alt={movie.title} className={classes.movieImage} />
            <p className={classes.movieTitle}>{movie.title}</p>
            <p className={classes.movieYear}>{movie.year}</p>
        </div>
    );
}

export default MovieCard;
