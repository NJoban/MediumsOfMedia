import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Movies from "./Pages/Movies/Movies";
import NavBar from "./Components/Navbar/NavBar";
import MediaDetails from "./Components/MediaDetails/MediaDetails";
import Shows from "./Pages/Shows/Shows";
import Account from "./Pages/Account/Account";
import { auth, CheckSignedIn } from "./Assets/Firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";


const App = () => {
  // cannot use auth.currentuser since its not a state
  // and will not cause re-render
  const [isSignedIn, setIsSignedIn] = useState(CheckSignedIn())
  // persists signed in state through refresh
  onAuthStateChanged(auth, (user) => user ? setIsSignedIn(true) : setIsSignedIn(false))

  return (
    <BrowserRouter>
      <NavBar setIsSignedIn={setIsSignedIn} isSignedIn={isSignedIn} />
      <div className="bodyContainer">
        <Routes>
          <Route path="/" element={<Home isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />} />
          <Route path="/account" element={<Account isSignedIn={isSignedIn} />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/id/:id" element={<MediaDetails name="movies" type="Movie" url_type="movie" />} />
          <Route path="/movies/genre/:genre" element={<Movies />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/shows/id/:id" element={<MediaDetails name="shows" type="Show" url_type="tv" />} />
          <Route path="/shows/genre/:genre" element={<Shows />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
