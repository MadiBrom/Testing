import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const Home = () => {
  const [circles, setCircles] = useState([]);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [confettiExplosions, setConfettiExplosions] = useState([]);

  useEffect(() => {
    // Spawn the initial circle in the center
    spawnCircle();
  }, []);

  // Helper function to generate a random hex color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const spawnCircle = () => {
    const centerX = window.innerWidth / 2 - 50;
    const centerY = window.innerHeight / 2 - 50;
    const newCircle = {
      id: `circle${Date.now()}`,
      x: centerX,
      y: centerY,
      color: getRandomColor(),
    };
    setCircles((prevCircles) => [...prevCircles, newCircle]);
  };

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
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const circleId = e.dataTransfer.getData("circleId");

    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;

    // Update the position of the moved circle
    setCircles((prevCircles) =>
      prevCircles.map((circle) =>
        circle.id === circleId ? { ...circle, x: newX, y: newY } : circle
      )
    );

    // Add a new confetti explosion at the drop location
    setConfettiExplosions((prevExplosions) => [
      ...prevExplosions,
      { x: newX + 50, y: newY + 50, id: Date.now() }, // Unique ID for each explosion
    ]);

    // Spawn a new circle with a random color
    spawnCircle();
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
        overflow: "hidden",
      }}
    >
      <h1>Discover the Ultimate Interactive Fidget Playground!</h1>
      <p>Click, drag, and explore endless fidget possibilities.</p>

      {circles.map((circle) => (
        <div
          key={circle.id}
          id={circle.id}
          draggable
          onDragStart={(e) => handleDragStart(e, circle.id)}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: circle.color,
            position: "absolute",
            left: `${circle.x}px`,
            top: `${circle.y}px`,
          }}
        ></div>
      ))}

      {confettiExplosions.map((explosion) => (
        <Confetti
          key={explosion.id}
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={150}
          recycle={false}
          initialVelocityY={15}
          confettiSource={{
            x: explosion.x,
            y: explosion.y,
            w: 0,
            h: 0,
          }}
        />
      ))}
    </div>
  );
};

export default Home;
