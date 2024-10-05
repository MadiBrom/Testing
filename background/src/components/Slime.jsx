import React, { useEffect, useRef } from "react";

const Slime = () => {
  const starfieldRef = useRef(null);
  const stars = [];

  useEffect(() => {
    const starfield = starfieldRef.current;
    const starCount = 1000; // Number of stars

    // Function to make stars float around slowly
    const floatStar = (star) => {
      const moveStar = () => {
        const deltaX = Math.random() * 2 - 1; // Random value between -1 and 1
        const deltaY = Math.random() * 2 - 1; // Random value between -1 and 1

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

        // Call moveStar again after a short delay to create continuous movement
        setTimeout(moveStar, 50);
      };

      moveStar();
    };

    // Function to create a star element
    const createStar = () => {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.width = `${Math.random() * 7 + 2}px`; // Random width between 2-9px
      star.style.height = star.style.width; // Keep it a circle
      star.style.top = `${Math.random() * window.innerHeight}px`; // Random vertical position
      star.style.left = `${Math.random() * window.innerWidth}px`; // Random horizontal position
      starfield.appendChild(star);
      stars.push(star);

      // Start the random floating animation for this star
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
        const attractionSpeed = 30; // Speed factor to control attraction

        // Calculate new position towards mouse
        const moveX = (deltaX / distance) * attractionSpeed;
        const moveY = (deltaY / distance) * attractionSpeed;

        // Apply movement
        star.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    // Add event listener for mouse movement
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div ref={starfieldRef} className="starfield"></div>;
};

export default Slime;
