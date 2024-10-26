import React, { useEffect, useRef } from "react";

const Lines = () => {
  const canvasRef = useRef(null);
  const stars = Array.from({ length: 200 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 5 + 3,
    color: `hsl(${Math.random() * 360}, 100%, 75%)`,
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const draw = (mouseX, mouseY) => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw each star
      stars.forEach(({ x, y, size, color }) => {
        context.beginPath();
        context.arc(x, y, size, 0, Math.PI * 2);
        context.fillStyle = color;
        context.fill();
        context.closePath();
      });

      const proximityRadius = 150;
      const nearbyStars = stars.filter(
        ({ x, y }) => Math.hypot(mouseX - x, mouseY - y) < proximityRadius
      );

      // Draw lines between nearby stars
      nearbyStars.forEach((star, index) => {
        for (let i = index + 1; i < nearbyStars.length; i++) {
          const nextStar = nearbyStars[i];
          const distance = Math.hypot(star.x - nextStar.x, star.y - nextStar.y);

          if (distance < 100) {
            context.beginPath();
            context.moveTo(star.x, star.y);
            context.lineTo(nextStar.x, nextStar.y);
            context.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
            context.lineWidth = 2;
            context.stroke();
            context.closePath();
          }
        }

        // Draw a line from the mouse to each nearby star
        const distanceToMouse = Math.hypot(mouseX - star.x, mouseY - star.y);
        if (distanceToMouse < proximityRadius) {
          context.beginPath();
          context.moveTo(mouseX, mouseY);
          context.lineTo(star.x, star.y);
          context.strokeStyle = `rgba(255, 255, 255, ${
            1 - distanceToMouse / proximityRadius
          })`;
          context.lineWidth = 2;
          context.stroke();
          context.closePath();
        }
      });
    };

    const handleMouseMove = (event) => {
      draw(event.clientX, event.clientY);
    };

    const handleMouseClick = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      // Pull only the stars connected to the mouse towards it
      const proximityRadius = 150;
      const connectedStars = stars.filter(
        ({ x, y }) => Math.hypot(mouseX - x, mouseY - y) < proximityRadius
      );

      connectedStars.forEach((star) => {
        const deltaX = mouseX - star.x;
        const deltaY = mouseY - star.y;
        const pullStrength = 0.1; // Adjust for how quickly they move towards the mouse

        star.x += deltaX * pullStrength;
        star.y += deltaY * pullStrength;
      });

      draw(mouseX, mouseY); // Redraw with updated positions
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleMouseClick);

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseClick);
    };
  }, [stars]);

  return (
    <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0 }} />
  );
};

export default Lines;
