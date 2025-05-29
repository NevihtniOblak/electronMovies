import Movie from "../Movie";
import { useThemeStore } from "../../../../zustand/useThemeStore";
import classesDark from "./MovieCardDark.module.scss";
import classesLight from "./MovieCardLight.module.scss";

type MovieCardProps = {
    movie: Movie;
    onClick?: () => void;
};

function MovieCard({ movie, onClick }: MovieCardProps) {
    const theme = useThemeStore((state) => state.theme);
    const activeClasses = theme === "dark" ? classesDark : classesLight;

    return (
        <div className={activeClasses.movieCard} onClick={onClick}>
            <img src={movie.imgPath} alt={movie.title} className={activeClasses.movieImage} />
            <p className={activeClasses.movieTitle}>{movie.title}</p>
            <p className={activeClasses.movieYear}>{movie.year}</p>
        </div>
    );
}

export default MovieCard;
