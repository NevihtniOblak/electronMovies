class Movie {
    public title: string;
    public year: number;
    public genres: string[];
    public rating: number;
    public actors: string[];
    public description: string;
    public isBookmarked: boolean;
    public imgPath: string;

    constructor(
        title: string,
        year: number,
        genres: string[],
        rating: number,
        actors: string[],
        description: string,
        isBookmarked: boolean,
        imgPath: string
    ) {
        this.title = title;
        this.year = year;
        this.genres = genres;
        this.rating = rating;
        this.actors = actors;
        this.description = description;
        this.isBookmarked = isBookmarked;
        this.imgPath = imgPath;
    }

    public getGenresString(): string {
        return this.genres.join(", ");
    }

    public getActorsString(): string {
        return this.actors.join(", ");
    }
}

export default Movie;
