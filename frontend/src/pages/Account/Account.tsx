import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { child, get, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { auth, database } from '../../Assets/Firebase/Firebase'
import CardList from '../../Components/CardList/CardList';
import PopupModal from '../../Components/PopupModal/PopupModal';
import { Movie } from '../../Interfaces/MovieType';
import { Show } from '../../Interfaces/ShowType';
import styles from './Account.module.css';

interface AccountProps {
    isSignedIn: boolean
}

const Account = ({ isSignedIn }: AccountProps) => {
    const [data, setData] = useState<Movie[] | Show[] | any>()
    const [modalShow, setModalShow] = useState(false);

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
                <div className={styles.accountHeader}>
                    <h1>My List</h1>
                    <div className={styles.createListBtnContainer}>
                        <Button variant="dark" onClick={() => setModalShow(true)}>
                            <FontAwesomeIcon icon={faPlus} />&nbsp;
                            Create a List
                        </Button>
                    </div>
                </div>
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

            <PopupModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                titleText="Create Media List"

            />
        </div>
    )
}

export default Account