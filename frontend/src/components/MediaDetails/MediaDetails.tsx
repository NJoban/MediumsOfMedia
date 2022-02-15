import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faVideo } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import { Button, Nav, Toast, ToastContainer } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { instanceOfMovie, instanceOfShow } from '../../Assets/Helpers/InterfaceTypecheck';
import { MovieType } from '../../Interfaces/MovieType'
import { ShowType } from '../../Interfaces/ShowType';
import styles from './MediaDetails.module.css';
import { auth, database } from '../../Assets/Firebase/Firebase';
import { NavLink } from 'react-router-dom';
import { ref, set } from 'firebase/database'

interface MediaDetailsProps {
    type: String;
    name: String;
    url_type: String;
}

const MediaDetails = ({ type, name, url_type }: MediaDetailsProps) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [mediaData, setMediaData] = useState<MovieType | ShowType>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/${url_type}/${id}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`, {
            "method": "GET",
        })
            .then(response => response.json())
            .then(data => {
                setMediaData(data)
            })
    }, [id])

    const OnBackClick = (e: any) => {
        navigate(-1)
    }


    const onGenreClick = (id?: Number) => {
        if (typeof id != "undefined" && id > 0) {
            navigate(`/${name}/genre/${id}`)
            navigate(0);
            return
        }
        navigate(`/${name}`)
        navigate(0);
    }

    const AddToList = () => {
        set(ref(database, 'users/' + auth.currentUser?.uid + `/${mediaData?.id}`), {
            ...mediaData,
            type: name
        }).then(() => {
            /**
             * TODO
             * add a success and failure toast
             */
            console.log('saved to list')
        }).catch(() => {
            console.error('failed to save media')
        })
    }

    return (
        <div className={styles.mediaDetials}>
            <div style={{ display: loading ? "block" : "none" }} className='loader'></div>
            <div style={{ display: !loading ? "flex" : "none" }} className={styles.detailsContainer}>
                <div className={styles.titleContainer}>
                    <h2>
                        {
                            mediaData != undefined && instanceOfMovie(mediaData)
                                ? mediaData?.title : mediaData?.name
                        }
                    </h2>
                    <h1>{mediaData?.vote_average}</h1>

                </div>
                <div className={styles.detailsBodyContainer}>
                    <div className={styles.imgContainer}>
                        <img
                            className={styles.movieImage}
                            src={`https://image.tmdb.org/t/p/original/${mediaData?.poster_path}`}
                            alt={`${type} Image`}
                            onLoad={() => {
                                setLoading(false)
                            }} />
                    </div>
                    <div className={styles.infoContainer}>
                        <div className={styles.genreContainer}>
                            {
                                mediaData?.genres?.map((genre, index) => {
                                    return (
                                        <h5
                                            className={styles.genre}
                                            key={index}
                                            onClick={() => onGenreClick(genre.id)}
                                        >
                                            {genre.name}
                                        </h5>
                                    )
                                })
                            }
                        </div>
                        <p>{mediaData?.overview}</p>

                        <i><p>{mediaData?.tagline}</p></i>
                        {
                            mediaData != undefined && instanceOfShow(mediaData) &&
                            <>
                                <span>
                                    <FontAwesomeIcon icon={faVideo} /> &nbsp;
                                    Seasons: {mediaData.number_of_seasons}
                                </span>
                                <span>
                                    <FontAwesomeIcon icon={faFilm} /> &nbsp;
                                    Episodes: {mediaData.number_of_episodes}
                                </span>
                                {mediaData?.next_episode_to_air != null &&
                                    <p>Next Episode coming <b>{mediaData?.next_episode_to_air?.air_date}</b></p>
                                }
                                <br />

                            </>
                        }
                        <div className={styles.addToListContainer}>
                            <Button className={styles.addListBtn} variant='dark' onClick={() => auth.currentUser != null ? AddToList() : setShowToast(true)}>Add To List</Button>
                        </div>
                        <ToastContainer className="p-3" position="top-end" >
                            <Toast bg="dark" onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide >
                                <Toast.Header closeButton={false}>
                                    <strong className={styles.toastHeader}>Not Signed In</strong>
                                </Toast.Header>
                                <Toast.Body className="text-white">
                                    You must be signed in to add {name} to a list
                                    <br /><br />
                                    <NavLink className="inherit" to="/" style={({ isActive }) => ({
                                        color: isActive ? 'rgba(255,255,255)' : ''
                                    })} ><b> Click here to go Signup</b> </NavLink>
                                </Toast.Body>
                            </Toast>
                        </ToastContainer>
                    </div>
                </div>
            </div>
            <Button className={styles.backBtn} variant='dark' onClick={(e) => OnBackClick(e)}>Go Back ↩</Button>
        </div >
    )
}

export default MediaDetails