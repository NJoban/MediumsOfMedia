import { Director } from './DirectorType';
export interface Movie {
    id?: number;
    name: string;
    genre: string;
    rating: number;
    img_url: string;
    director: Director;
}

export function isMovieString(data: string): boolean {
    return data === "Movie";
}

export function InsertIntoMovie(data: Movie) {
    const bodyJSON = JSON.stringify({
        mutation: `{ addMovie ( name: "${data.name}", genre: "${data.genre}", rating: ${data.rating}, img_url: "${data.img_url}"directorId: ${data.director.id}) { id } }`,
    })
    fetch("http://localhost:8888/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: bodyJSON,
    }).then((response) => {
        console.log(bodyJSON)
        console.log(response);
        return response;
    });
}
