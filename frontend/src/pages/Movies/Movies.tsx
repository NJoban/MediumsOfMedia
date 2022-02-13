import React, { useEffect, useState } from 'react'
import CardList from '../../Components/CardList/CardList'
import { Movie } from '../../Interfaces/MovieType'

const Movies = () => {
    const [movies, setMovies] = useState<Movie[]>()
    useEffect(() => {
        console.log(process.env.REACT_APP_MOVIE_DB_API_KEY)
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`, {
            "method": "GET",
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setMovies(data.results)
            })
    }, [])

    return (
        <div>
            <CardList listOfData={movies!} title={"Movies 🎬"} name={"movies"} />
        </div>
    )
}

export default Movies
