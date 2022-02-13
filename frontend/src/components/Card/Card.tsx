import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Movie } from '../../Interfaces/MovieType'
import styles from './Card.module.css'

interface CardProps {
    data: Movie;
}

const Card = ({ data }: CardProps) => {
    const navigation = useNavigate();
    const OnCardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        navigation(`./${data.id}`)
    }

    return (
        <div className={styles.cardContainer} onClick={(e) => OnCardClick(e)} >
            <div className={styles.movieImageContainer}>
                <img className={styles.movieImage} src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt="Movie Image" />
            </div>
            <p>{data.title}</p>
            <p>{data.vote_average}</p>
            <p>{data.overview}</p>
        </div>
    )
}

export default Card
