import canvasSketch from "canvas-sketch";

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  return ({ context, width, height }) => {
    var img = new Image();
    img.src =
      "https://plus.unsplash.com/premium_photo-1715876267901-617fcb78efa1?q=80&w=3872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    img.onload = function () {
      var canvasAspect = width / height;
      var imageAspect = img.width / img.height;
      var renderWidth, renderHeight, xOffset, yOffset;

      if (canvasAspect > imageAspect) {
        renderWidth = width;
        renderHeight = width / imageAspect;
        xOffset = 0;
        yOffset = (height - renderHeight) / 2;
      } else {
        renderWidth = height * imageAspect;
        renderHeight = height;
        xOffset = (width - renderWidth) / 2;
        yOffset = 0;
      }

      context.drawImage(img, xOffset, yOffset, renderWidth, renderHeight);
      /* const gradient = context.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        width / 2
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.5)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height); */
      // Overlay a wavy, semi-transparent shape
      // context.fillStyle = "#0000007d"; // Semi-transparent color
      // const margin = 1 / 4;

      // Off-white background
      // context.fillStyle = "hsl(0, 0%, 98%)";
      // context.fillRect(0, 0, width, height);

      // Gradient foreground
      // const fill = context.createLinearGradient(0, 0, width, height);
      // fill.addColorStop(0, "cyan");
      // fill.addColorStop(1, "blue");

      // Fill rectangle
      // context.fillStyle = fill;
      // context.fillRect(margin, margin, width - margin * 2, height - margin * 2);

      // Bottom curve
      // Bottom curve
      context.fillStyle = "rgb(247, 122, 5,0.6)"; // Red color for the bottom curve
      context.beginPath();
      context.moveTo(0, height * 0.75); // Starting point on the left at 75% height
      context.bezierCurveTo(
        width * 0.35,
        height, // Control point 1 (left hill)
        width * 0.75,
        height * 0.45, // Control point 2 (right hill)
        width,
        height // Ending point on the right at 75% height
      );
      context.lineTo(width, height); // Draw a straight line down to the bottom-right corner
      context.lineTo(0, height); // Draw a straight line to the bottom-left corner
      context.closePath();
      context.fill();

      // Top curve
      /* context.fillStyle = "white"; // Red color for the top curve
    context.beginPath();
    context.moveTo(0, 0); // Starting point at the top-left corner
    context.lineTo(width * 0.5, 0); // Draw a straight line to the right (50% of the width)
    context.bezierCurveTo(
      width * 0.25,
      height * 0.15,
      width * 0.25,
      height * 0.05,
      width * 0.015,
      height * 0.25
    );
    context.lineTo(0, height * 0.15); // Draw a straight line down to the bottom left corner of the curve
    context.lineTo(0, width); // Draw a straight line to the bottom-left corner

    context.closePath();
    context.fill(); */

      context.fillStyle = "rgb(247, 122, 5,0.6)"; // Red color for the top curve
      context.beginPath();
      context.moveTo(0, 0); // Starting point at the top-left corner
      context.lineTo(width * 0.65, 0); // Draw a straight line to the right (50% of the width)
      /*  context.bezierCurveTo(
      width * 0.25, // First control point (horizontally centered between start and end points)
      0, // First control point (higher to create a pronounced curve)
      width * 0.25, // Second control point (horizontally centered between start and end points)
      height * 0.2, // Second control point (higher to create a pronounced curve)
      0, // Ending point (back to the left)
      height * 0.25 // Ending point (at 25% height)
    ); */

      context.bezierCurveTo(
        height * 0.15, // First control point (horizontally centered between start and end points)
        width * 0.029,
        height * 0.15, // First control point (higher to create a pronounced curve)
        width * 0.29, // Second control point (horizontally centered between start and end points)
        0, // Ending point (back to the left)
        height * 0.25 // Ending point (at 25% height)
      );
      context.lineTo(0, 0); // Draw a straight line up to the starting point
      context.closePath();
      context.fill();

      // Adding text
      context.font = "bold 300px system-ui";
      context.fillStyle = "white";
      context.fillText("Chill", 50, 300);
      context.fillStyle = "white";
      context.fillText("Covers", 80, 550);
    };

    context.restore();
  };
};

canvasSketch(sketch, settings);
