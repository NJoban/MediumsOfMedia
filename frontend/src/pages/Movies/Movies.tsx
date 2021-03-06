import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { OnSearch } from '../../Assets/Helpers/OnSearch'
import CardList from '../../Components/CardList/CardList'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Movie, MovieGenre } from '../../Interfaces/MovieType'
import styles from './Movies.module.css'

interface oldData {
    oldGenre?: string
    oldPage?: number;
}

const Movies = () => {
    const { genre } = useParams();
    const navigate = useNavigate();
    const totalPages = 500;
    const [movies, setMovies] = useState<Movie[]>()
    const inputRef = useRef<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginiationCheck, setPaginiationCheck] = useState(true)
    const SideBarPages: MovieGenre[] = [
        {
            id: -1,
            name: "Popular"
        },
        {
            id: 28,
            name: "Action",
        },
        {
            id: 12,
            name: "Adventure",
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
            id: 18,
            name: "Drama",
        },
        {
            id: 14,
            name: "Fantasy",
        },
        {
            id: 27,
            name: "Horror",
        },
        {
            id: 878,
            name: "Science Fiction"
        }
    ]

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&with_genres=${genre}`, {
            "method": "GET",
        })
            .then(response => response.json())
            .then(data => {
                data.results.map((movie: Movie) => movie.type = "movies")
                setMovies(data.results)
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
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&with_genres=${genre}&page=${currentPage}`, {
            "method": "GET",
        })
            .then(response => response.json())
            .then(data => {
                data.results.map((movie: Movie) => movie.type = "movies")
                setMovies(data.results)
            })
    }, [currentPage])

    const handleSearch = () => {
        let encodedSearchWord = encodeURIComponent(inputRef.current?.value)
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&query=${encodedSearchWord}`
        OnSearch(url, setMovies, "movies")
        setPaginiationCheck(false)
    }

    return (
        <>
            <div className={styles.moviesContainer}>
                <Sidebar name="movies" title="Movies ????" sideBarPages={SideBarPages} />
                {
                    typeof movies == "undefined" ?
                        <div className='loader'></div>
                        :
                        <CardList
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            pageCount={totalPages}
                            listOfData={movies!}
                            title={"Movies ????"}
                            name={"movies"}
                            inputRef={inputRef}
                            handleSearch={handleSearch}
                            paginiationCheck={paginiationCheck}
                        />

                }
            </div>
        </>
    )
}

export default Movies
