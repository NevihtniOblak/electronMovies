import { useState } from "react";
import TopBar from "../TopBar/TopBar";
import Movie from "./components/Movie";
import MovieCard from "./components/MovieCard/MovieCard";
import SelectedMovie from "./components/SelectedMovie/SelectedMovie";
import { useThemeStore } from "../../zustand/useThemeStore";
import classesDark from "./MainPageDark.module.scss";
import classesLight from "./MainPageLight.module.scss";

function MainPage() {
    const [movies] = useState<Movie[]>([
        new Movie(
            "Angry Birds",
            2016,
            ["Animation", "Comedy"],
            6.3,
            ["Jason Sudeikis", "Josh Gad"],
            "Flightless birds face off against green pigs.",
            false,
            "images/ab.png"
        ),
        new Movie(
            "Minecraft: The Movie",
            2025,
            ["Adventure", "Fantasy"],
            0,
            ["Unknown"],
            "An epic journey based on the popular sandbox game.",
            false,
            "images/mm.jpg"
        ),
        new Movie(
            "The Phantom Menace",
            1999,
            ["Sci-Fi", "Action"],
            6.5,
            ["Liam Neeson", "Ewan McGregor"],
            "Jedi fight the rising Sith threat.",
            false,
            "images/pm.jpeg"
        ),
        new Movie(
            "Spiderman: Homecoming",
            2017,
            ["Action", "Adventure"],
            7.4,
            ["Tom Holland", "Michael Keaton"],
            "Peter Parker balances school and being Spider-Man.",
            false,
            "images/sh.jpg"
        ),
        new Movie(
            "The Matrix",
            1999,
            ["Action", "Sci-Fi"],
            8.7,
            ["Keanu Reeves", "Laurence Fishburne"],
            "A hacker discovers the world is a simulation.",
            false,
            "images/tm.jpg"
        ),
    ]);

    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const theme = useThemeStore((state) => state.theme);
    const classes = theme === "dark" ? classesDark : classesLight;

    return (
        <div className={classes.container}>
            <TopBar />
            <div className={classes.selectedMovie}>{selectedMovie && <SelectedMovie movie={selectedMovie} />}</div>
            <div className={classes.movieList}>
                {movies.map((movie, index) => (
                    <MovieCard key={index} movie={movie} onClick={() => setSelectedMovie(movie)} />
                ))}
            </div>
        </div>
    );
}

export default MainPage;
