import React, { useEffect, useRef } from "react";

const Slime = () => {
  const bubblefieldRef = useRef(null);
  const bubbles = [];

  useEffect(() => {
    const bubblefield = bubblefieldRef.current;
    const bubbleCount = 300; // Number of shapes

    // Function to make shapes float around smoothly across the whole screen
    const floatBubble = (bubble) => {
      const moveBubble = () => {
        const deltaX = (Math.random() * 2 - 1) * 1;
        const deltaY = (Math.random() * 2 - 1) * 1;

        let currentX = parseFloat(bubble.style.left) || 0;
        let currentY = parseFloat(bubble.style.top) || 0;

        let newX = currentX + deltaX;
        let newY = currentY + deltaY;

        // Wrap around if out of bounds
        if (newX < 0) newX = window.innerWidth;
        if (newX > window.innerWidth) newX = 0;
        if (newY < 0) newY = window.innerHeight;
        if (newY > window.innerHeight) newY = 0;

        bubble.style.left = `${newX}px`;
        bubble.style.top = `${newY}px`;

        // Use requestAnimationFrame for smooth movement
        requestAnimationFrame(moveBubble);
      };

      moveBubble();
    };

    // Function to create a bubble element
    const createBubble = () => {
      const bubble = document.createElement("div");

      // Randomly assign a class for different shapes
      const shapeTypes = ["bubble", "square", "triangle"];
      const shapeClass =
        shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      bubble.classList.add(shapeClass);

      bubble.style.width = `${Math.random() * 10 + 5}px`;
      bubble.style.height = bubble.style.width;
      bubble.style.top = `${Math.random() * window.innerHeight}px`;
      bubble.style.left = `${Math.random() * window.innerWidth}px`;

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
        // Calculate direction towards mouse
        const bubbleX = bubble.offsetLeft + bubble.offsetWidth / 2;
        const bubbleY = bubble.offsetTop + bubble.offsetHeight / 2;
        const deltaX = mouseX - bubbleX;
        const deltaY = mouseY - bubbleY;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const attractionSpeed = 20; // Adjusted speed factor for smoother attraction

        if (distance > 0) {
          // Calculate new position towards mouse
          const moveX = (deltaX / distance) * attractionSpeed;
          const moveY = (deltaY / distance) * attractionSpeed;

          // Apply movement
          bubble.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
      });
    };

    // Handle mouse click to repulse nearby bubbles
    const handleMouseClick = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const repulsionRadius = 150; // Radius for push-away effect

      bubbles.forEach((bubble) => {
        // Calculate distance from mouse to bubble
        const bubbleX = bubble.offsetLeft + bubble.offsetWidth / 2;
        const bubbleY = bubble.offsetTop + bubble.offsetHeight / 2;
        const deltaX = bubbleX - mouseX;
        const deltaY = bubbleY - mouseY;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        // Only apply repulsion if within repulsion radius
        if (distance < repulsionRadius && distance > 0) {
          // Make the repulsion strength inversely proportional to the distance
          const repulsionStrength =
            (repulsionRadius - distance) / repulsionRadius;
          const repulsionDistance = repulsionStrength * 30;

          // Calculate new position away from mouse
          const moveX = (deltaX / distance) * repulsionDistance;
          const moveY = (deltaY / distance) * repulsionDistance;

          // Ensure the new position remains within bounds, wrapping around if necessary
          let newX = bubble.offsetLeft + moveX;
          let newY = bubble.offsetTop + moveY;

          if (newX < 0) newX = window.innerWidth;
          if (newX > window.innerWidth) newX = 0;
          if (newY < 0) newY = window.innerHeight;
          if (newY > window.innerHeight) newY = 0;

          bubble.style.left = `${newX}px`;
          bubble.style.top = `${newY}px`;
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

export default Slime;
