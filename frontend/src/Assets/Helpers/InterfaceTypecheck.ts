import { Show } from "./../../Interfaces/ShowType";
import { Movie } from "./../../Interfaces/MovieType";

export const instanceOfMovie = (
    data: Movie | Show | undefined
): data is Movie => (!("name" in data!) ? true : false);
export const instanceOfShow = (data: Movie | Show | undefined): data is Show =>
    "name" in data! ? true : false;
