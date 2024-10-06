import React, { useState, useEffect } from "react";
import "./pops.css"; // Importing the updated CSS file

const Bubbles = () => {
  const [bubbles, setBubbles] = useState([]);

  // Generate bubbles with random properties when the component mounts
  useEffect(() => {
    const generatedBubbles = Array.from({ length: 20 }, (_, index) => ({
      id: `bubble${index + 1}`,
      size: Math.floor(Math.random() * 50) + 50, // Random size between 50px and 100px
      gradient: getRandomGradient(),
      position: getRandomPosition(),
    }));
    setBubbles(generatedBubbles);
  }, []);

  // Function to get a random position within the viewport that keeps the shape visible
  const getRandomPosition = () => {
    return {
      top: Math.max(0, Math.random() * (window.innerHeight - 100)),
      left: Math.max(0, Math.random() * (window.innerWidth - 100)),
    };
  };

  // Function to get a random pastel gradient
  const getRandomGradient = () => {
    const pastelColors = [
      "#FFB3BA", // Light Pink
      "#FFDFBA", // Light Orange
      "#FFFFBA", // Light Yellow
      "#BAFFC9", // Light Green
      "#BAE1FF", // Light Blue
      "#E0BBE4", // Light Purple
      "#C2C2F0", // Light Lavender
    ];

    const color1 =
      pastelColors[Math.floor(Math.random() * pastelColors.length)];
    const color2 =
      pastelColors[Math.floor(Math.random() * pastelColors.length)];
    const angle = Math.floor(Math.random() * 360); // Random angle for gradient

    return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
  };

  // Function to handle the button click: fade out, teleport, then fade in
  const handleClick = (id) => {
    const button = document.querySelector(`.${id}`);
    if (button) {
      // Add fade-out animation
      button.classList.add("fade-out");

      // After the fade-out, move the button to a new position while it is invisible
      setTimeout(() => {
        setBubbles((prevBubbles) =>
          prevBubbles.map((bubble) =>
            bubble.id === id
              ? {
                  ...bubble,
                  position: getRandomPosition(),
                }
              : bubble
          )
        );

        // Remove fade-out class and add fade-in class for reappearance
        button.classList.remove("fade-out");
        button.classList.add("fade-in");

        // Remove the fade-in class after animation completes
        setTimeout(() => {
          button.classList.remove("fade-in");
        }, 600);
      }, 600); // Duration matches the fade-out animation duration
    }
  };

  return (
    <div className="shapes-container-bubbles">
      {bubbles.map((bubble) => (
        <button
          key={bubble.id}
          className={`shape-button-bubbles ${bubble.id}`}
          onClick={() => handleClick(bubble.id)}
          style={{
            top: `${bubble.position.top}px`,
            left: `${bubble.position.left}px`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            position: "absolute",
          }}
          data-gradient={bubble.gradient}
        ></button>
      ))}
    </div>
  );
};

export default Bubbles;
