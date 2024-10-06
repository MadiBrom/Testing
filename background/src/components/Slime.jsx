import React, { useEffect, useRef } from "react";

const Slime = () => {
  const bubblefieldRef = useRef(null);
  const bubbles = [];

  useEffect(() => {
    const bubblefield = bubblefieldRef.current;
    const bubbleCount = 300; // Number of bubbles

    // Function to make bubbles float around smoothly across the whole screen
    const floatBubble = (bubble) => {
      const moveBubble = () => {
        const deltaX = (Math.random() * 2 - 1) * 1; // Adjust for faster movement across the screen
        const deltaY = (Math.random() * 2 - 1) * 1; // Adjust for faster movement across the screen

        let currentX = parseFloat(bubble.style.left) || 0;
        let currentY = parseFloat(bubble.style.top) || 0;

        let newX = currentX + deltaX;
        let newY = currentY + deltaY;

        // If the bubble goes out of bounds, wrap it around to the other side of the screen
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
      bubble.classList.add("bubble");
      bubble.style.width = `${Math.random() * 10 + 2}px`; // Random width between 2-12px
      bubble.style.height = bubble.style.width; // Keep it a circle
      bubble.style.top = `${Math.random() * window.innerHeight}px`; // Random vertical position
      bubble.style.left = `${Math.random() * window.innerWidth}px`; // Random horizontal position
      bubblefield.appendChild(bubble);
      bubbles.push(bubble);

      // Start the smooth floating animation for this bubble
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
        const attractionSpeed = 50; // Reduced speed factor for smoother attraction

        // Calculate new position towards mouse
        const moveX = (deltaX / distance) * attractionSpeed;
        const moveY = (deltaY / distance) * attractionSpeed;

        // Apply movement
        bubble.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    // Handle mouse click to repulse nearby bubbles
    const handleMouseClick = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const repulsionRadius = 500; // Increased radius for a more gradual push-away effect

      bubbles.forEach((bubble) => {
        // Calculate distance from mouse to bubble
        const bubbleX = bubble.offsetLeft + bubble.offsetWidth / 2;
        const bubbleY = bubble.offsetTop + bubble.offsetHeight / 2;
        const deltaX = bubbleX - mouseX;
        const deltaY = bubbleY - mouseY;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        // Only apply repulsion if within repulsion radius
        if (distance < repulsionRadius) {
          // Make the repulsion strength inversely proportional to the distance
          const repulsionStrength =
            (repulsionRadius - distance) / repulsionRadius;
          const repulsionDistance = repulsionStrength * 30; // Scale down for a gentler effect

          // Calculate new position away from mouse
          const moveX = (deltaX / distance) * repulsionDistance;
          const moveY = (deltaY / distance) * repulsionDistance;

          // Apply movement by updating the bubble's position
          let newX = bubble.offsetLeft + moveX;
          let newY = bubble.offsetTop + moveY;

          // Ensure the new position remains within bounds, wrapping around if necessary
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
    };
  }, []);

  return <div ref={bubblefieldRef} className="bubblefield"></div>;
};

export default Slime;
