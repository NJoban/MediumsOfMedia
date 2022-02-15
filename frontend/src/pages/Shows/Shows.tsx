import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { OnSearch } from '../../Assets/Helpers/OnSearch'
import CardList from '../../Components/CardList/CardList'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Show, ShowGenre } from '../../Interfaces/ShowType'
import styles from './Shows.module.css'
const Shows = () => {
    const { genre } = useParams();
    const totalPages = 500;
    const [shows, setShows] = useState<Show[]>()
    const inputRef = useRef<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginiationCheck, setPaginiationCheck] = useState(true);
    const SideBarPages: ShowGenre[] = [
        {
            id: -1,
            name: "Popular"
        },
        {
            id: 10759,
            name: "Action",
        },
        {
            id: 16,
            name: "Animation"
        },
        {
            id: 35,
            name: "Comedy",
        },
        {
            id: 80,
            name: "Crime",
        },
        {
            id: 99,
            name: "Documentary",
        },
        {
            id: 18,
            name: "Drama",
        },
        {
            id: 10762,
            name: "Kids"
        },
        {
            id: 10765,
            name: "Sci-Fi"
        }
    ]

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&with_genres=${genre}`, {
            "method": "GET",
        })
            .then(response => response.json())
            .then(data => {
                data.results.map((show: Show) => show.type = "shows")
                setShows(data.results)
            })
        if (currentPage == 1 && sessionStorage.getItem("genre") == genre) {
            setCurrentPage(Number(sessionStorage.getItem("page")))
        }
    }, [genre])

    // pagination resets when viewing detials so saved with sessionStorage
    useEffect(() => {
        sessionStorage.setItem("page", currentPage.toString())
        sessionStorage.setItem("genre", genre!)
    }, [currentPage])

    // useState is an async function so reseting state to 1
    // will not affect the fetch and will use the previously set currentPage
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&with_genres=${genre}&page=${currentPage}`, {
            "method": "GET",
        })
            .then(response => response.json())
            .then(data => {
                data.results.map((show: Show) => show.type = "shows")
                setShows(data.results)
            })
    }, [currentPage])

    const handleSearch = () => {
        let encodedSearchWord = encodeURIComponent(inputRef.current?.value)
        let url = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&query=${encodedSearchWord}`
        OnSearch(url, setShows, "shows")
        setPaginiationCheck(false)
    }
    return (
        <>
            <div className={styles.showsContainer}>
                <Sidebar
                    name="shows"
                    title="Shows 📺"
                    sideBarPages={SideBarPages} />
                {
                    typeof shows == "undefined" ?
                        <div className='loader'>Loading...</div>
                        :
                        <CardList
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            pageCount={totalPages}
                            listOfData={shows!}
                            title={"Shows 📺"}
                            name={"shows"}
                            inputRef={inputRef}
                            handleSearch={handleSearch}
                            paginiationCheck={paginiationCheck}
                        />

                }
            </div>
        </>
    )
}

export default Shows
