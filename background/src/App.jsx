import React from "react";
import { Route, Routes } from "react-router-dom";
import Slime from "./components/Slime";
import Navbar from "./components/Navbar";
import Buttons from "./components/buttons/Buttons";
import Birds from "./components/Birds";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/slime" element={<Slime />} />
        <Route path="/buttons" element={<Buttons />} />
        <Route path="/birds" element={<Birds />} />
      </Routes>
    </div>
  );
}

export default App;
