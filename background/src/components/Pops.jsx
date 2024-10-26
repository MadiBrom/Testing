import React, { useEffect, useRef, useState } from "react";

const Pops = () => {
  const popfieldRef = useRef(null);
  const [pops, setPops] = useState([]);

  useEffect(() => {
    const popCount = 20; // Initial number of pops
    const spawnInterval = 2000; // Interval time in milliseconds to create new pops

    // Function to generate a random gradient with transparency
    const generateRandomGradient = () => {
      const colors = [
        "rgba(255, 154, 158, 0.7)",
        "rgba(250, 208, 196, 0.7)",
        "rgba(173, 216, 230, 0.7)",
        "rgba(248, 194, 235, 0.7)",
        "rgba(161, 140, 209, 0.7)",
        "rgba(248, 194, 235, 0.7)",
        "rgba(143, 211, 244, 0.7)",
        "rgba(132, 250, 176, 0.7)",
        "rgba(207, 217, 223, 0.7)",
        "rgba(161, 196, 253, 0.7)",
        "rgba(250, 232, 171, 0.7)",
        "rgba(255, 221, 225, 0.7)",
        "rgba(212, 252, 121, 0.7)",
        "rgba(150, 230, 161, 0.7)",
      ];
      const randomColor1 = colors[Math.floor(Math.random() * colors.length)];
      const randomColor2 = colors[Math.floor(Math.random() * colors.length)];
      const angle = Math.floor(Math.random() * 360);
      return `linear-gradient(${angle}deg, ${randomColor1}, ${randomColor2})`;
    };

    // Function to create a new pop
    const createPop = (offScreen = false) => {
      const id = Math.random().toString(36).substr(2, 9);
      const size = Math.random() * 50 + 30; // Size between 30px and 80px
      const initialX = offScreen
        ? Math.random() > 0.5
          ? -size
          : window.innerWidth + size
        : Math.random() * window.innerWidth;
      const initialY = offScreen
        ? Math.random() > 0.5
          ? -size
          : window.innerHeight + size
        : Math.random() * window.innerHeight;
      const gradient = generateRandomGradient(); // Random gradient for each pop
      const pop = {
        id,
        size,
        x: initialX,
        y: initialY,
        gradient, // Store gradient in the pop object
        velocityX: (Math.random() * 2 - 1) * 0.2,
        velocityY: (Math.random() * 2 - 1) * 0.2,
        popped: false,
      };
      setPops((prev) => [...prev, pop]);
    };

    // Create initial pops
    for (let i = 0; i < popCount; i++) {
      createPop();
    }

    // Update function to animate pops
    const updatePositions = () => {
      setPops((prev) =>
        prev.map((pop) => {
          if (pop.popped) return pop; // Skip popped pops
          let newX = pop.x + pop.velocityX;
          let newY = pop.y + pop.velocityY;

          // Wrap around if out of bounds
          if (newX < 0) newX = window.innerWidth;
          if (newX > window.innerWidth) newX = 0;
          if (newY < 0) newY = window.innerHeight;
          if (newY > window.innerHeight) newY = 0;

          return { ...pop, x: newX, y: newY };
        })
      );
      requestAnimationFrame(updatePositions);
    };

    updatePositions();

    // Create new pops every `spawnInterval` milliseconds
    const intervalId = setInterval(() => {
      createPop(true); // Spawn a new pop off-screen
    }, spawnInterval);

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
      setPops([]); // Clear pops
    };
  }, []);

  // Handle pop effect
  const handlePop = (id) => {
    setPops((prev) =>
      prev.map((pop) => (pop.id === id ? { ...pop, popped: true } : pop))
    );
    setTimeout(() => {
      setPops((prev) => prev.filter((pop) => pop.id !== id));
      createPop(true); // Create a new pop off-screen
    }, 300); // Duration matches the animation time
  };

  return (
    <div ref={popfieldRef} className="popfield">
      {pops.map((pop) => (
        <div
          key={pop.id}
          className={`pop ${pop.popped ? "popped" : ""}`}
          style={{
            width: pop.size,
            height: pop.size,
            left: pop.x,
            top: pop.y,
            position: "absolute",
            background: pop.gradient, // Apply the gradient as background
            borderRadius: "50%",
            boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
            transform: pop.popped ? "scale(1.2)" : "scale(1)",
            opacity: pop.popped ? 0 : 1,
            transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
            zIndex: 2,
            cursor: "pointer",
            pointerEvents: "auto",
          }}
          onClick={() => handlePop(pop.id)}
        />
      ))}
      <style jsx>{`
        .popfield {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: 1;
          pointer-events: none;
        }

        .pop {
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
};

export default Pops;
