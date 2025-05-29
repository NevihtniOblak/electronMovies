import React from "react";
import Movie from "../Movie";
import classes from "./MovieCard.module.scss";

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <div className={classes.movieCard}>
            <img src={movie.imgPath} alt={movie.title} className={classes.movieImage} />
            <p className={classes.movieTitle}>{movie.title}</p>
            <p className={classes.movieYear}>{movie.year}</p>
        </div>
    );
};

export default MovieCard;
