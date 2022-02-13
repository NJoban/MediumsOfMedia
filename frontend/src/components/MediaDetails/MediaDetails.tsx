import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { MovieType } from '../../Interfaces/MovieType'
import styles from './MediaDetails.module.css';

interface MovieDetailsProps {
    type: String;
}

const MediaDetails = ({ type }: MovieDetailsProps) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [mediaData, setMediaData] = useState<MovieType>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (type === "Movie") {
            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`, {
                "method": "GET",
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setMediaData(data)
                })
        }
    }, [id])

    const OnBackClick = (e: any) => {
        navigate(-1)
    }

    return (
        <>
            <div style={{ display: loading ? "block" : "none" }} className={styles.loader}>Loading...</div>
            <div style={{ display: !loading ? "block" : "none" }} className={styles.detailsContainer}>
                <h1>{mediaData?.title}</h1>
                <div className={styles.detailsBodyContainer}>
                    <div className={styles.imgContainer}>
                        <img
                            className={styles.movieImage}
                            src={`https://image.tmdb.org/t/p/original/${mediaData?.poster_path}`}
                            alt={`${type} Image`}
                            onLoad={() => {
                                setLoading(false)
                                console.log('loaded')
                            }} />
                    </div>
                    <div className={styles.infoContainer}>
                        <p>{mediaData?.tagline}</p>
                        <p>{mediaData?.vote_average}</p>
                        <p>{mediaData?.overview}</p>
                    </div>
                </div>
            </div>
            <Button variant='dark' onClick={(e) => OnBackClick(e)}>Go Back ↩</Button>
        </>
    )
}

export default MediaDetails