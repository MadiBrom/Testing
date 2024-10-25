import React from "react";
import { Route, Routes } from "react-router-dom";
import Slime from "./components/Slime";
import Navbar from "./components/Navbar";
import Buttons from "./components/buttons/Buttons";
import Bubbles from "./components/bubbles/Bubbles";
import Birds from "./components/Birds";
import MoveBox from "./components/box/MoveBox";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/slime" element={<Slime />} />
        <Route path="/buttons" element={<Buttons />} />
        <Route path="/bubbles" element={<Bubbles />} />
        <Route path="/birds" element={<Birds />} />
        <Route path="/move" element={<MoveBox />} />
      </Routes>
    </div>
  );
}

export default App;
