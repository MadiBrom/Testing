import React, { useState } from "react";

const Home = () => {
  const [positions, setPositions] = useState({
    circle1: { x: 0, y: 0 },
    circle2: { x: 0, y: 0 },
    circle3: { x: 0, y: 0 },
  });

  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleDragStart = (e, circleId) => {
    const rect = e.target.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    e.dataTransfer.setData("circleId", circleId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allows the drop action
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const circleId = e.dataTransfer.getData("circleId");

    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;

    setPositions((prevPositions) => ({
      ...prevPositions,
      [circleId]: { x: newX, y: newY },
    }));
  };

  return (
    <div
      className="home-container"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        textAlign: "center",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        height: "100vh",
        position: "relative",
      }}
    >
      <h1>Welcome to Fidget Haven!</h1>
      <p>Your one-stop shop for all things fidgety!</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        <div
          id="circle1"
          draggable
          onDragStart={(e) => handleDragStart(e, "circle1")}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "#FEC6C7",
            position: "absolute",
            left: `${positions.circle1.x}px`,
            top: `${positions.circle1.y}px`,
          }}
        ></div>
        <div
          id="circle2"
          draggable
          onDragStart={(e) => handleDragStart(e, "circle2")}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "#A7C7E7",
            position: "absolute",
            left: `${positions.circle2.x}px`,
            top: `${positions.circle2.y}px`,
          }}
        ></div>
        <div
          id="circle3"
          draggable
          onDragStart={(e) => handleDragStart(e, "circle3")}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "#F4F6A7",
            position: "absolute",
            left: `${positions.circle3.x}px`,
            top: `${positions.circle3.y}px`,
          }}
        ></div>
      </div>
      <button
        style={{
          marginTop: "2rem",
          padding: "10px 20px",
          fontSize: "1.2rem",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => alert("Explore our unique fidget collection!")}
      >
        Explore Fidgets
      </button>
    </div>
  );
};

export default Home;
