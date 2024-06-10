const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const createGrid = () => {
    const pallete = random.pick(palettes);
    const points = [];
    const count = 12;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        let data = {
          u,
          v,
          color: random.pick(pallete),
        };

        points.push(data);
      }
    }
    return points;
  };

  const points = createGrid();

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    points.forEach((data) => {
      const { u, v, color } = data;
      const x = u * width;
      const y = v * height;

      context.beginPath();
      context.arc(x, y, 120, 0, Math.PI * 2, false);
      context.strokeStyle = color;
      context.lineWidth = "20";
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
