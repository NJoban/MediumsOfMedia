import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Movies from "./Pages/Movies/Movies";
import NavBar from "./Components/Navbar/NavBar";
import Create from "./Components/Forms/Create/Create";
import MediaDetails from "./Components/MediaDetails/MediaDetails";


const App = () => {
  return (
      <BrowserRouter>
        <NavBar />
        <div className="bodyContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MediaDetails type="Movie" />} />
        </Routes>
        </div>
      </BrowserRouter>
  );
};

export default App;
