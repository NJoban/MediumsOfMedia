import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";

const NavBar = () => {
    return (
        <Navbar className={styles.navbar} bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <NavLink className="inherit" to="/" >
                        Home 🐱‍👤
                    </NavLink>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link>
                        <NavLink className="inherit" to="/movies" style={({ isActive }) => ({
                            color: isActive ? 'rgba(255,255,255,.75)' : ''
                        })}>
                            Movies 🎬
                        </NavLink>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;
