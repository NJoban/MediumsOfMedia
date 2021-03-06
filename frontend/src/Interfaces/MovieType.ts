export interface Movie {
    type: String;
    poster_path?: String;
    adult?: boolean;
    overview?: String;
    release_date?: String;
    genre_ids?: Number[];
    id: Number;
    original_title?: String;
    original_language?: String;
    title: String;
    backdrop_path?: String;
    popularity?: Number;
    vote_count?: Number;
    video?: boolean;
    vote_average?: number;
}

export interface MovieType extends Movie {
    genres?: MovieGenre[];
    homepage?: String;
    production_companies?: object;
    tagline?: String;
}

export interface MovieGenre {
    name: String;
    id: Number;
}