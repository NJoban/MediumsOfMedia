import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import styles from './home.module.css'
import { auth } from '../../Assets/Firebase/Firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

interface HomeProps {
    isSignedIn: boolean;
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home = ({ isSignedIn, setIsSignedIn }: HomeProps) => {

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then((res) => {
                setIsSignedIn(true)
            }).catch((err) => {
                console.error(err);
            })
    }

    const signOut = () => {
        auth.signOut()
        setIsSignedIn(false)
    }
    return (
        <div className={styles.homeContainer}>
            <div className={styles.bodyContainer}>
                {isSignedIn ?
                    <Button variant="dark" className={styles.loginBtn} onClick={signOut}> Sign out </Button>
                    :
                    <Button variant="dark" className={styles.loginBtn} onClick={signInWithGoogle}>Sign In With Google</Button>
                }
            </div>
        </div>
    )
}

export default Home;
