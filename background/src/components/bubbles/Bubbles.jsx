import React, { useState, useEffect } from "react";
import "./pops.css";

const Bubbles = () => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const generatedBubbles = Array.from({ length: 20 }, (_, index) => ({
      id: `bubble${index + 1}`,
      size: Math.floor(Math.random() * 50) + 50,
      gradient: getRandomGradient(),
      finalPosition: getRandomPosition(),
      startPosition: getStartPosition(), // Starting position off-screen
    }));
    setBubbles(generatedBubbles);
  }, []);

  const getRandomPosition = () => ({
    top: Math.random() * (window.innerHeight - 100),
    left: Math.random() * (window.innerWidth - 100),
  });

  const getStartPosition = () => ({
    top: Math.random() * (window.innerHeight - 100),
    left: Math.random() < 0.5 ? -100 : window.innerWidth + 100, // Offscreen left or right
  });

  const getRandomGradient = () => {
    const pastelColors = [
      "#FFB3BA",
      "#FFDFBA",
      "#FFFFBA",
      "#BAFFC9",
      "#BAE1FF",
      "#E0BBE4",
      "#C2C2F0",
    ];
    const color1 =
      pastelColors[Math.floor(Math.random() * pastelColors.length)];
    const color2 =
      pastelColors[Math.floor(Math.random() * pastelColors.length)];
    const angle = Math.floor(Math.random() * 360);
    return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
  };

  const handleClick = (id) => {
    setBubbles((prevBubbles) =>
      prevBubbles.filter((bubble) => bubble.id !== id)
    );
  };

  return (
    <div className="shapes-container-pops">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble-wrapper"
          onClick={() => handleClick(bubble.id)}
          style={{
            top: `${bubble.startPosition.top}px`,
            left: `${bubble.startPosition.left}px`,
            width: `${bubble.size + 8}px`,
            height: `${bubble.size + 8}px`,
            position: "absolute",
            "--gradient": bubble.gradient,
            "--final-top": `${bubble.finalPosition.top}px`,
            "--final-left": `${bubble.finalPosition.left}px`,
          }}
        >
          <div
            className="bubble-inner"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Bubbles;
