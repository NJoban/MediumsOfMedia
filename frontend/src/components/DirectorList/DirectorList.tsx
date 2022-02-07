import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Director } from "../../assets/helpers/DirectorType";

const DirectorList = () => {
    const [directors, setDirectors] = useState<Array<Director>>();
    useEffect(() => {
        fetch('http://localhost:8888/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: `{ 
                        directors { 
                            id
                            name, 
                            age
                        }
                    }`
            })
        })
            .then(response => response.json())
            .then(_ => {
                setDirectors(_.data.directors);
            })
    }, [])

    useEffect(() => {
        console.log(JSON.stringify(directors));
        console.log(directors);
    }, [directors])

    return (
        <div>
            <table className="table table-dark table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        directors! && directors.length > 0 ?
                            directors.map((director) => {
                                return (
                                    <tr>
                                        <th scope="row">{director.id}</th>
                                        <td>{director.name}</td>
                                        <td>{director.age}</td>
                                    </tr>
                                )
                            })
                            : 'No Director available'
                    }
                </tbody>
            </table>
            <br/>
            <NavLink to="./add">
                <Button variant="dark">➕Add a Director</Button>
            </NavLink>
        </div>
    );
};

export default DirectorList;
