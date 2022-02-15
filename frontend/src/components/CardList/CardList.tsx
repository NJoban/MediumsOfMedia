import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { MutableRefObject, useEffect, useState } from "react";
import { Button, FormControl, InputGroup, Pagination } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Movie } from "../../Interfaces/MovieType";
import { Show } from "../../Interfaces/ShowType";
import Card from "../Card/Card";
import Paginations from "../Paginations/Paginations";
import styles from './CardList.module.css';

interface CardListProps {
    listOfData: Movie[] | Show[]
    title?: String
    name?: String
    pageCount?: number;
    currentPage?: number;
    setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
    inputRef?: MutableRefObject<null>
    handleSearch?: any,
    paginiationCheck?: boolean;
}

const CardList = (
    {
        listOfData,
        title,
        name,
        pageCount,
        currentPage,
        setCurrentPage,
        inputRef,
        handleSearch,
        paginiationCheck
    }: CardListProps) => {

    return (
        <div style={{ marginLeft: inputRef ? "21%" : "0" }} >
            {
                inputRef != undefined &&
                <div className={styles.inputContainer}>
                    <InputGroup size="lg">
                        <InputGroup.Text id="basic-addon1">
                            <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                        </InputGroup.Text>
                        <FormControl
                            placeholder={`${title}`}
                            aria-label={`${title}`}
                            aria-describedby="basic-addon1"
                            ref={inputRef}
                            onKeyPress={(e) => { if (e.key === 'Enter') handleSearch() }}
                        />
                    </InputGroup>
                </div>
            }
            <div className={styles.cardsContainer}>
                {
                    listOfData! && listOfData.length > 0 ?
                        listOfData.map((data, index) => {
                            return (
                                <div key={index}>
                                    <Card name={data.type} data={data} />
                                </div>
                            )
                        })
                        : `No ${name} available`
                }
            </div>
            {
                currentPage != undefined &&
                <div className={styles.paginationsContainer} >
                    <Paginations
                        currentPage={currentPage!}
                        setCurrentPage={setCurrentPage!}
                        pageCount={pageCount!}
                        paginiationCheck={paginiationCheck!}
                    />
                </div>
            }

        </div >
    );
};

export default CardList;
