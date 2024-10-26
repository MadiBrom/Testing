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

    const waveParams = [
      {
        amplitude: 25,
        wavelength: 0.015,
        speed: 0.02,
        offset: Math.random() * Math.PI * 2,
      },
      {
        amplitude: 20,
        wavelength: 0.025,
        speed: 0.03,
        offset: Math.random() * Math.PI * 2,
      },
      {
        amplitude: 15,
        wavelength: 0.035,
        speed: 0.04,
        offset: Math.random() * Math.PI * 2,
      },
      {
        amplitude: 30,
        wavelength: 0.02,
        speed: 0.025,
        offset: Math.random() * Math.PI * 2,
      },
    ];

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    window.addEventListener("resize", resizeCanvas);

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Define water-like gradient with more dynamic colors
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        width / 4,
        width / 2,
        height / 2,
        width
      );
      gradient.addColorStop(0, "#0077be");
      gradient.addColorStop(0.3, "#00a1c2");
      gradient.addColorStop(0.6, "#003a70");
      gradient.addColorStop(1, "#001f3f");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw multiple wave layers for more natural, flowing movement
      waveParams.forEach((wave, index) => {
        ctx.beginPath();
        ctx.moveTo(0, height / 2);

        for (let x = 0; x <= width; x++) {
          const y =
            wave.amplitude * Math.sin(x * wave.wavelength + wave.offset) +
            wave.amplitude *
              0.5 *
              Math.sin(x * wave.wavelength * 1.5 + wave.offset * 1.2) +
            wave.amplitude *
              0.25 *
              Math.sin(x * wave.wavelength * 2 + wave.offset * 1.5) +
            height / 2;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        // Use a gradient with alpha blending to create the fluid effect
        ctx.fillStyle = `rgba(${50 + 20 * index}, ${120 + 20 * index}, ${
          200 + 15 * index
        }, 0.07)`;
        ctx.fill();

        // Update the offset to animate the waves
        wave.offset += wave.speed;
      });

      requestAnimationFrame(draw);
    }

    draw();

    return () => {
      0;
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="ocean-canvas" />;
};

export default Ocean;
