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

      // Ocean gradient for a more subtle water effect
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#4da6ff");
      gradient.addColorStop(0.5, "#0077be");
      gradient.addColorStop(1, "#003a70");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Adjust parameters for layered ripple effects
      const gridSize = 15; // Smaller grid size for more detailed ripples
      for (let layer = 0; layer < 3; layer++) {
        // Three layers of ripples
        const amplitude = 1 + layer * 0.5; // Each layer has a slightly larger amplitude
        const frequency = 0.05 + layer * 0.01; // Each layer has a different frequency

        for (let x = 0; x < width; x += gridSize) {
          for (let y = 0; y < height; y += gridSize) {
            const wave = Math.sin((x + y) * frequency + time) * amplitude;
            let size = (Math.cos(x * 0.02 + y * 0.02 + time) + 1) * 1.5 + wave;

            // Clamp size to prevent negative values
            size = Math.max(0, size);

            // Adjust color for the depth effect and a bit of highlight
            const highlight = wave > 0 ? 255 : 200; // Lighter color on the top of waves
            ctx.fillStyle = `rgba(${highlight}, ${highlight}, 255, ${
              0.05 + wave * 0.07
            })`;

            ctx.beginPath();
            ctx.arc(x, y, size, 0, 2 * Math.PI);
            ctx.fill();
          }
        }
      }

      time += 0.02; // Adjust speed of ripple animation
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
