import React, { useEffect, useRef, useState } from "react";

const Pops = () => {
  const popfieldRef = useRef(null);
  const [pops, setPops] = useState([]);

  useEffect(() => {
    const popCount = 50; // Number of pops

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
      const pop = {
        id,
        size,
        x: initialX,
        y: initialY,
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

    return () => {
      setPops([]); // Clear pops when component unmounts
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
            backgroundColor: "rgba(173, 216, 230, 0.7)",
            borderRadius: "50%",
            boxShadow: "0 0 8px rgba(173, 216, 230, 0.5)",
            transform: pop.popped ? "scale(0)" : "scale(1)",
            opacity: pop.popped ? 0 : 1,
            transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
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
          z-index: -1;
          pointer-events: none;
        }

        .pop {
          cursor: pointer;
          pointer-events: auto; /* Make sure clicks are registered */
        }
      `}</style>
    </div>
  );
};

export default Pops;
