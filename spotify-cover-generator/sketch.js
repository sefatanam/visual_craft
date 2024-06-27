import canvasSketch from "canvas-sketch";

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  return ({ context, width, height }) => {
    var img = new Image();
    img.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRYvghBCnP9a0OZ_LNvc9F8AoVth3_3A4XfA&s";
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
      const gradient = context.createLinearGradient(20, 0, 220, 0);

      // Add three color stops
      gradient.addColorStop(0, "#0000005d");
      gradient.addColorStop(0.7, "#0000006d");
      gradient.addColorStop(1, "#0000007d");

      // Set the fill style and draw a rectangle
      context.fillStyle = gradient;
      context.beginPath();
      context.moveTo(0, height * 0.75);
      context.bezierCurveTo(
        width * 0.25,
        height * 0.65,
        width * 0.75,
        height * 0.85,
        width,
        height * 0.75
      );
      context.lineTo(width, height);
      context.lineTo(0, height);
      context.closePath();
      context.fill();

      context.fillStyle = "#0000007d"; // Semi-transparent color
      context.beginPath();
      context.moveTo(0, height * 0.25);
      context.bezierCurveTo(
        width * 0.25,
        height * 0.35,
        width * 0.75,
        height * 0.15,
        width,
        height * 0.25
      );
      context.lineTo(width, 0);
      context.lineTo(0, 0);
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
