import React, { useEffect, useRef } from "react";

const Slime = () => {
  const starfieldRef = useRef(null);
  const stars = [];

  useEffect(() => {
    const starfield = starfieldRef.current;
    const starCount = 800; // Number of stars

    // Function to make stars float around smoothly
    const floatStar = (star) => {
      const moveStar = () => {
        const deltaX = (Math.random() * 2 - 1) * 0.5; // Smaller random value for smoother movement
        const deltaY = (Math.random() * 2 - 1) * 0.5; // Smaller random value for smoother movement

        const currentX = parseFloat(star.style.left) || 0;
        const currentY = parseFloat(star.style.top) || 0;

        let newX = currentX + deltaX;
        let newY = currentY + deltaY;

        // Keep star within bounds of the window
        newX = Math.max(
          0,
          Math.min(window.innerWidth - star.offsetWidth, newX)
        );
        newY = Math.max(
          0,
          Math.min(window.innerHeight - star.offsetHeight, newY)
        );

        star.style.left = `${newX}px`;
        star.style.top = `${newY}px`;

        // Use requestAnimationFrame for smooth movement
        requestAnimationFrame(moveStar);
      };

      moveStar();
    };

    // Function to create a star element
    const createStar = () => {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.width = `${Math.random() * 10 + 2}px`; // Random width between 2-12px
      star.style.height = star.style.width; // Keep it a circle
      star.style.top = `${Math.random() * window.innerHeight}px`; // Random vertical position
      star.style.left = `${Math.random() * window.innerWidth}px`; // Random horizontal position
      starfield.appendChild(star);
      stars.push(star);

      // Start the smooth floating animation for this star
      floatStar(star);
    };

    // Create initial stars
    for (let i = 0; i < starCount; i++) {
      createStar();
    }

    // Handle mouse movement to attract stars
    const handleMouseMove = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      stars.forEach((star) => {
        // Calculate direction towards mouse
        const starX = star.offsetLeft + star.offsetWidth / 2;
        const starY = star.offsetTop + star.offsetHeight / 2;
        const deltaX = mouseX - starX;
        const deltaY = mouseY - starY;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const attractionSpeed = 20; // Reduced speed factor for smoother attraction

        // Calculate new position towards mouse
        const moveX = (deltaX / distance) * attractionSpeed;
        const moveY = (deltaY / distance) * attractionSpeed;

        // Apply movement
        star.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    // Handle mouse click to repulse nearby stars
    const handleMouseClick = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const repulsionRadius = 100; // Radius of effect for repulsion

      stars.forEach((star) => {
        // Calculate distance from mouse to star
        const starX = star.offsetLeft + star.offsetWidth / 2;
        const starY = star.offsetTop + star.offsetHeight / 2;
        const deltaX = starX - mouseX;
        const deltaY = starY - mouseY;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        // Only apply repulsion if within repulsion radius
        if (distance < repulsionRadius) {
          const repulsionDistance = 50; // Distance factor to control repulsion

          // Calculate new position away from mouse
          const moveX = (deltaX / distance) * repulsionDistance;
          const moveY = (deltaY / distance) * repulsionDistance;

          // Apply movement by updating the star's position
          star.style.left = `${star.offsetLeft + moveX}px`;
          star.style.top = `${star.offsetTop + moveY}px`;
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

  return <div ref={starfieldRef} className="starfield"></div>;
};

export default Slime;
