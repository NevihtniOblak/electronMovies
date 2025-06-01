import { useEffect, useState } from "react";
import TopBar from "../TopBar/TopBar";
import Movie from "../../models/Movie";
import MovieCard from "./components/MovieCard/MovieCard";
import SelectedMovie from "./components/SelectedMovie/SelectedMovie";
import { useThemeStore } from "../../zustand/useThemeStore";
import classesDark from "./MainPageDark.module.scss";
import classesLight from "./MainPageLight.module.scss";

function MainPage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const theme = useThemeStore((state) => state.theme);
    const classes = theme === "dark" ? classesDark : classesLight;

    useEffect(() => {
        window.electronAPI.getMovies().then((storedMovies) => {
            const movieInstances = storedMovies.map(
                (data) =>
                    new Movie(
                        data.title,
                        data.year,
                        data.genres,
                        data.rating,
                        data.actors,
                        data.description,
                        data.isBookmarked,
                        data.imgPath
                    )
            );
            setMovies(movieInstances);
        });
    }, []);

    const addMovie = (newMovie: Movie) => {
        const updated = [...movies, newMovie];
        setMovies(updated);
        window.electronAPI.setMovies(updated);
    };

    const removeMovie = (movieToRemove: Movie) => {
        const updated = movies.filter((m) => m !== movieToRemove);
        setMovies(updated);
        setSelectedMovie(null);
        window.electronAPI.setMovies(updated);
    };

    const toggleBookmark = (movie: Movie) => {
        movie.isBookmarked = !movie.isBookmarked;
        window.electronAPI.setMovies(movies);
    };

    return (
        <div className={classes.container}>
            <TopBar onLoadMovie={addMovie} />
            <div className={classes.selectedMovie}>
                {selectedMovie && (
                    <SelectedMovie movie={selectedMovie} onRemove={removeMovie} onToggleBookmark={toggleBookmark} />
                )}
            </div>
            <div className={classes.movieList}>
                {movies.map((movie, index) => (
                    <MovieCard key={index} movie={movie} onClick={() => setSelectedMovie(movie)} />
                ))}
            </div>
        </div>
    );
}

export default MainPage;
