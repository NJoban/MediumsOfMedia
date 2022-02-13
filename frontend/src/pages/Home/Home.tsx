import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import styles from './home.module.css'

const Home = () => {

    const fetchMovieDbTesting = () => {
        fetch("https://movie-database-imdb-alternative.p.rapidapi.com/?r=json&i=tt4154796", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
                "x-rapidapi-key": "83ccd43eacmshe8a99239e28eef5p1fb8d0jsn7d670c20d4b2"
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        fetchMovieDbTesting();
    }, [])

    return (
        <div className={styles.homeContainer}>
            <h1>Just a little side project 🐱‍👤🐱‍👤🐱‍👤</h1>
            <div className={styles.bodyContainer}>
                <Button className={styles.loginBtn} variant="dark">Login</Button>
                <Button className={styles.signupBtn} variant="dark">Signup</Button>
            </div>
        </div>
    )
}

export default Home;
