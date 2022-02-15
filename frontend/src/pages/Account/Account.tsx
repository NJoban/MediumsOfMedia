import { child, get, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { auth, database } from '../../Assets/Firebase/Firebase'
import CardList from '../../Components/CardList/CardList';
import { Movie } from '../../Interfaces/MovieType';
import { Show } from '../../Interfaces/ShowType';
import styles from './Account.module.css';

interface AccountProps {
    isSignedIn: boolean
}

const Account = ({ isSignedIn }: AccountProps) => {
    const [data, setData] = useState<Movie[] | Show[] | any>()

    useEffect(() => {
        // const mediaRef = ref(database);
        // get(child(mediaRef, 'users/' + auth.currentUser?.uid)).then((snapshot) => {
        //     console.log(snapshot)
        //     if (snapshot.exists()) {
        //         const snapData = snapshot.val()
        //         console.log(snapData)
        //         setData(Object.values(snapData))

        //     }
        // })

        const mediaRef = ref(database, 'users/' + auth.currentUser?.uid);
        onValue(mediaRef, (snapshot) => {
            if (snapshot.exists()) {
                const snapData = snapshot.val();
                setData(Object.values(snapData))
            }
        }, {
            onlyOnce: true
        });
    }, [isSignedIn])

    return (
        <div className={styles.accountContainer}>
            {auth.currentUser != null &&
                <h1>My List</h1>
            }
            {
                typeof data == "undefined" ?
                    <div className='loader'></div>
                    :
                    <CardList
                        listOfData={data!}
                        name={data?.type}
                    />
            }
        </div>
    )
}

export default Account