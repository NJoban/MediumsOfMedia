import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Movie } from "../../../Interfaces/MovieType";
import styles from "./create.module.css";

interface CreateProps {
    type: string;
}

const Create = (props: CreateProps) => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [directors, setDirectors] = useState<Array<any> | Promise<any>>();
    const [movieFormObj, setMovieFormObj] = useState<any>()

    useEffect(() => {
        if (props.type === "Movie") {
            fetch("http://localhost:8888/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    query: `{ 
                                directors { 
                                    id,
                                    name,
                                    age
                                }
                            }`,
                }),
            })
                .then((response) => response.json())
                .then((_) => {
                    setDirectors(_.data.directors);
                });
        }
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValidated(true);
        if (event.currentTarget.checkValidity() === false) {
            event.stopPropagation();
            return
        }
        if (props.type === "Movie") {
            console.log(movieFormObj)
            // navigate("/movies")
        }
    };
    return (
        <div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                { isNaN(12) ? (
                    // add a movie
                    <div className={styles.formBodyContainer}>
                        <Form.Group as={Row} className="mb-4 center">
                            <Form.Label column sm={2}>
                                Name
                            </Form.Label>
                            <Col sm={3}>
                                <Form.Control
                                    onChange={(e) =>
                                        setMovieFormObj({
                                            ...movieFormObj,
                                            name: `${e.target.value}`,
                                        })
                                    }
                                    required
                                    type="text"
                                    placeholder="Avengers"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid Name
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-4 center">
                            <Form.Label column sm={2}>
                                Genre
                            </Form.Label>
                            <Col sm={3}>
                                <Form.Control
                                    onChange={(e) =>
                                        setMovieFormObj({
                                            ...movieFormObj,
                                            genre: `${e.target.value}`,
                                        })
                                    }
                                    type="text"
                                    placeholder="Adventure"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid Genre
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-4 center">
                            <Form.Label column sm={2}>
                                Rating
                            </Form.Label>
                            <Col sm={3}>
                                <Form.Control
                                    onChange={(e) =>
                                        setMovieFormObj({
                                            ...movieFormObj,
                                            rating: Number(e.target.value)
                                        })
                                    }
                                    type="number"
                                    placeholder="8.3"
                                    step="0.1"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid Rating
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-4 center">
                            <Form.Label column sm={2}>
                                Image URL
                            </Form.Label>
                            <Col sm={3}>
                                <Form.Control
                                    onChange={(e) =>
                                        setMovieFormObj({
                                            ...movieFormObj,
                                            img_url: `${e.target.value}`,
                                        })
                                    }
                                    type="text"
                                    placeholder="Insert an image URL"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid Image URL
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-4 center">
                            <Form.Label column sm={2}>
                                Director
                            </Form.Label>
                            <Col sm={3}>
                                <Form.Select
                                    onChange={(e) =>
                                        setMovieFormObj({
                                            ...movieFormObj,
                                            director: { id: Number(e.target.value) },
                                        })
                                    }
                                >
                                    {Array.isArray(directors) ?
                                        directors?.map((director) => {
                                            return (
                                                <option value={director.id}>
                                                    {director.name}
                                                </option>
                                            );
                                        }) :
                                        <></>
                                    }
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid Director
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Button variant="dark" type="submit">
                            Create a {props.type}
                        </Button>
                    </div>
                ) : (
                    // add a director
                    <div>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column>Name</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                />
                            </Col>
                        </Form.Group>
                    </div>
                )}
            </Form>
        </div>
    );
};

export default Create;
