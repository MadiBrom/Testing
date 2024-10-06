import React from "react";
import { Route, Routes } from "react-router-dom";
import Slime from "./components/Slime";
import Navbar from "./components/Navbar";
import Buttons from "./components/buttons/Buttons";
import Bubbles from "./components/bubbles/Bubbles";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Slime />} />
        <Route path="/buttons" element={<Buttons />} />
        <Route path="/bubbles" element={<Bubbles />} />
      </Routes>
    </div>
  );
}

export default App;
