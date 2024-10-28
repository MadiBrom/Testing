import React, { useRef, useEffect } from "react";

const Ocean = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let time = 0;

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    window.addEventListener("resize", resizeCanvas);

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Ocean gradient for depth effect
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#4da6ff");
      gradient.addColorStop(0.5, "#0077be");
      gradient.addColorStop(1, "#003a70");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Grid pattern for water ripple effect
      const gridSize = 20; // Adjust grid size for effect density
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const wave = Math.sin((x + y) * 0.05 + time) * 2;
          let size = (Math.cos((x + y) * 0.02 + time) + 1) * 2 + wave;

          // Ensure the radius (size) is non-negative
          size = Math.max(0, size);

          // Set color based on "depth" or "ripple intensity"
          ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + wave * 0.05})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, 2 * Math.PI);
          ctx.fill();
        }
      }

      time += 0.03; // Adjust to control wave speed
      requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="ocean-canvas" />;
};

export default Ocean;
