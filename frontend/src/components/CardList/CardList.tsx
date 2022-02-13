import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Movie } from "../../Interfaces/MovieType";
import Card from "../Card/Card";
import styles from './CardList.module.css';

interface CardListProps {
    listOfData: Movie[]
    title: String
    name: String
}

const CardList = ({ listOfData, title, name }: CardListProps) => {

    return (
        <div>
            <h1>{title}</h1>
            <div className={styles.cardsContainer}>
                {
                    listOfData! && listOfData.length > 0 ?
                        listOfData.map((data, index) => {
                            return (
                                <div key={index}>
                                    <Card data={data} />
                                </div>
                            )
                        })
                        : `No ${name} available`
                }
            </div>
            <NavLink to="./add">
                <Button variant="dark">➕Add a {name}</Button>
            </NavLink>
        </div>
    );
};

export default CardList;
