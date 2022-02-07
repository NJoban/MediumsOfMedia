import React, { useEffect, useState } from 'react'
import { Director } from '../../assets/helpers/DirectorType'
import { Movie } from '../../assets/helpers/MovieType'
import styles from './MovieCard.module.css'

interface MovieCardProps {
    movie: Movie,
    directors: Array<Director> | undefined
}

const MovieCard = (props: MovieCardProps) => {
    const [director, setDirector] = useState<Director>()

    useEffect(() => {
        setDirector(props.directors?.find(dir => dir.id == props.movie.director.id))
    }, [])

    return (
        <div className={styles.cardContainer}>
            <div className={styles.movieImageContainer}>
                <img className={styles.movieImage} src={props.movie.img_url} alt="Movie Image" />
            </div>
            <p>{props.movie.name}</p>
            <p>{props.movie.genre}</p>
            <p>{props.movie.rating}</p>
            <p>{director?.name}</p>
        </div>
    )
}

export default MovieCard
