import { Movie } from './../../Interfaces/MovieType';
import { Show } from './../../Interfaces/ShowType';
import React, { useEffect } from "react";

export const OnSearch = (
    url: String,
    setData: React.Dispatch<React.SetStateAction<any>>,
    type: String
) => {
        fetch(`${url}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                data.results.map((media: Show | Movie) => media.type = type)
                setData(data.results);
            });
};
