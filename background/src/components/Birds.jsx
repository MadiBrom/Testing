import React, { useEffect, useRef } from "react";

const Birds = () => {
  const bubblefieldRef = useRef(null);
  const bubbles = [];

  useEffect(() => {
    const bubblefield = bubblefieldRef.current;
    const bubbleCount = 300;

    // Function to make shapes float around smoothly across the whole screen
    const floatBubble = (bubble) => {
      const moveBubble = () => {
        // Add random small adjustments to create floating effect
        const deltaX = (Math.random() * 2 - 1) * 0.2;
        const deltaY = (Math.random() * 2 - 1) * 0.2;

        // Update velocities based on small random deltas for natural movement
        bubble.velocityX += deltaX;
        bubble.velocityY += deltaY;

        // Apply some damping to reduce speed over time for a smoother effect
        bubble.velocityX *= 0.98;
        bubble.velocityY *= 0.98;

        let newX = parseFloat(bubble.style.left) + bubble.velocityX || 0;
        let newY = parseFloat(bubble.style.top) + bubble.velocityY || 0;

        // Wrap around if out of bounds
        if (newX < 0) newX = window.innerWidth;
        if (newX > window.innerWidth) newX = 0;
        if (newY < 0) newY = window.innerHeight;
        if (newY > window.innerHeight) newY = 0;

        bubble.style.left = `${newX}px`;
        bubble.style.top = `${newY}px`;

        requestAnimationFrame(moveBubble);
      };

      moveBubble();
    };

    // Function to create a bubble element
    const createBubble = () => {
      const bubble = document.createElement("div");

      const shapeTypes = ["bubble", "square", "triangle"];
      const shapeClass =
        shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      bubble.classList.add(shapeClass);

      bubble.style.width = `${Math.random() * 10 + 5}px`;
      bubble.style.height = bubble.style.width;
      bubble.style.top = `${Math.random() * window.innerHeight}px`;
      bubble.style.left = `${Math.random() * window.innerWidth}px`;

      // Set initial velocity to zero
      bubble.velocityX = 0;
      bubble.velocityY = 0;

      bubblefield.appendChild(bubble);
      bubbles.push(bubble);

      // Start floating animation for this bubble
      floatBubble(bubble);
    };

    // Create initial bubbles
    for (let i = 0; i < bubbleCount; i++) {
      createBubble();
    }

    // Handle mouse movement to attract bubbles
    const handleMouseMove = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      bubbles.forEach((bubble) => {
        const bubbleX = bubble.offsetLeft + bubble.offsetWidth / 2;
        const bubbleY = bubble.offsetTop + bubble.offsetHeight / 2;
        const deltaX = mouseX - bubbleX;
        const deltaY = mouseY - bubbleY;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const attractionStrength = 0.1; // Strength factor for the attraction effect

        if (distance > 0) {
          // Apply attraction force to the bubble's velocity
          bubble.velocityX += (deltaX / distance) * attractionStrength;
          bubble.velocityY += (deltaY / distance) * attractionStrength;
        }
      });
    };

    // Handle mouse click to repulse nearby bubbles
    const handleMouseClick = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const repulsionRadius = 200; // Radius for push-away effect

      bubbles.forEach((bubble) => {
        const bubbleX = bubble.offsetLeft + bubble.offsetWidth / 2;
        const bubbleY = bubble.offsetTop + bubble.offsetHeight / 2;
        const deltaX = bubbleX - mouseX;
        const deltaY = bubbleY - mouseY;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const repulsionStrength = 1.5; // Strength factor for the repulsion effect

        if (distance < repulsionRadius && distance > 0) {
          // Apply repulsion force to the bubble's velocity
          bubble.velocityX += (deltaX / distance) * repulsionStrength;
          bubble.velocityY += (deltaY / distance) * repulsionStrength;
        }
      });
    };

    // Add event listeners for mouse movement and click
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleMouseClick);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseClick);
      bubbles.forEach((bubble) => bubble.remove());
    };
  }, []);

  return <div ref={bubblefieldRef} className="bubblefield"></div>;
};

export default Birds;
