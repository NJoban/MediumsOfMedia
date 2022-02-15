export interface Show {
    type: String;
    first_air_path?: String;
    poster_path?: String;
    overview?: String;
    genre_ids?: Number[];
    id: Number;
    original_language?: String;
    original_title?: String;
    name?: String;
    backdrop_path?: String;
    popularity?: Number;
    vote_count?: Number;
    vote_average?: number;
}

export interface ShowType extends Show {
    objectType: "Show";
    genres?: ShowGenre[];
    homepage?: String;
    production_companies?: object;
    tagline?: String;
    number_of_episodes?: number;
    number_of_seasons?: number;
    status?: String;
    next_episode_to_air: any;
}

export interface ShowGenre {
    name: String;
    id: Number;
}