import React from "react";
import { Route, Routes } from "react-router-dom";
import Slime from "./components/Slime";
import Navbar from "./components/Navbar";
import Buttons from "./components/buttons/Buttons";
import Birds from "./components/Birds";
import Home from "./components/Home";
import Pops from "./components/Pops";
import Lines from "./components/Lines";
import Ocean from "./components/water/Ocean";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/slime" element={<Slime />} />
        <Route path="/buttons" element={<Buttons />} />
        <Route path="/birds" element={<Birds />} />
        <Route path="/pops" element={<Pops />} />
        <Route path="/lines" element={<Lines />} />
        <Route path="/ocean" element={<Ocean />} />
      </Routes>
    </div>
  );
}

export default App;
