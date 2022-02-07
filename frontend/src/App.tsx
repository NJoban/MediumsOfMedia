import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import Directors from "./pages/Directors";
import NavBar from "./components/Navbar/NavBar";
import Create from "./components/Forms/Create/Create";
import { Movie as MovieType } from "./assets/helpers/MovieType";


const App = () => {
  return (
      <BrowserRouter>
        <NavBar />
        <div className="bodyContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/add" element={<Create type="Movie" />} />
          <Route path="/directors" element={<Directors />} />
          <Route path="/directors/add" element={<Create type="Director" />} />
        </Routes>
        </div>
      </BrowserRouter>
  );
};

export default App;
