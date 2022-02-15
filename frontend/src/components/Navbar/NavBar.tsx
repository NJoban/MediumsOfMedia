import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../Assets/Firebase/Firebase";
import styles from "./navbar.module.css";

interface NavBarProps {
    isSignedIn: boolean;
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const NavBar = ({ isSignedIn, setIsSignedIn }: NavBarProps) => {
    const navigate = useNavigate()

    const SignOut = () => {
        auth.signOut();
        setIsSignedIn(false);
        navigate("/")
    }

    return (
        <Navbar className={styles.navbar} bg="dark" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand href="/">
                    <NavLink className="inherit" to="/" >
                        Home
                    </NavLink>
                </Navbar.Brand>
                &nbsp;
                <Nav className="me-auto">
                    <NavLink className="inherit" to="/movies" style={({ isActive }) => ({
                        color: isActive ? 'rgba(255,255,255)' : 'rgba(255,255,255, 0.75)'
                    })}>
                        Movies 🎬 &nbsp;
                    </NavLink>
                    <NavLink className="inherit" to="/shows" style={({ isActive }) => ({
                        color: isActive ? 'rgba(255,255,255)' : 'rgba(255,255,255, 0.75)'
                    })}>
                        Shows 📺
                    </NavLink>
                </Nav>
                {
                    isSignedIn &&
                    <Nav className="justify-content-end">
                        <Dropdown >
                            <Dropdown.Toggle variant="dark">
                                {auth.currentUser?.displayName} &nbsp;
                                <FontAwesomeIcon icon={faUser} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className={styles.dropDownMenuContainer}>
                                <Dropdown.Item href="/account">
                                    Account
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => SignOut()}>Sign Out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                }

            </Container>
        </Navbar>
    );
};

export default NavBar;
