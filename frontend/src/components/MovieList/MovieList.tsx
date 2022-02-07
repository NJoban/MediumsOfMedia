import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Director } from "../../assets/helpers/DirectorType";
import { Movie } from "../../assets/helpers/MovieType";
import MovieCard from "../MovieCard/MovieCard";
import styles from './MovieList.module.css';



const MovieList = () => {
    const [movies, setMovies] = useState<Array<Movie>>();
    const [directors, setDirectors] = useState<Array<Director>>();
    useEffect(() => {
        fetch('http://localhost:8888/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: `{ 
                        movies { 
                            id
                            name, 
                            genre,
                            rating,
                            img_url,
                            director {
                                id
                            }
                        }
                    }`
            })
        })
            .then(response => response.json())
            .then(_ => { 
                console.log(_.data);
                setMovies(_.data.movies)
             })
        fetch('http://localhost:8888/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: `{ 
                        directors { 
                            id
                            name, 
                            age
                        }
                    }`
            })
        })
            .then(response => response.json())
            .then(_ => {
                setDirectors(_.data.directors);
            })
    }, [])

    useEffect(() => {
        console.log(JSON.stringify(movies));
        console.log(movies);
    }, [movies])

    return (
        <div>
            <h1>Movies 🎬</h1>
            <div className={styles.moviesContainer}>
                {
                    movies! && movies.length > 0 ?
                        movies.map((movie) => {
                            return (
                                <div>
                                    <MovieCard movie={movie} directors={directors} />
                                </div>
                            )
                        })
                        : 'No movies available'
                }
            </div>
            <NavLink to="./add">
                <Button variant="dark">➕Add a Movie</Button>
            </NavLink>
        </div>
    );
};

export default MovieList;
