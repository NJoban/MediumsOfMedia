import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { instanceOfMovie } from '../../Assets/Helpers/InterfaceTypecheck'
import { Movie } from '../../Interfaces/MovieType'
import { Show } from '../../Interfaces/ShowType'
import styles from './Card.module.css'

interface CardProps {
    data: Movie | Show;
    name: String;
}

const Card = ({ data, name }: CardProps) => {
    const navigation = useNavigate();
    const OnCardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        navigation(`/${name}/id/${data.id}`)
    }

    return (
        <div className={styles.cardContainer} onClick={(e) => OnCardClick(e)} >
            <div className={styles.cardImageContainer}>
                <img className={styles.cardImage} src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt="Movie Image" />
            </div>
            <div className={styles.cardDetails}>
                <p className={styles.cardDetailsTitle}>{
                    instanceOfMovie(data) ? data.title : data.name } 
                </p>
                <p>{data.vote_average}</p>
            </div>

        </div>
    )
}

export default Card
