const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");
const { lerp } = require("canvas-sketch-util/math");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const pallete = random.pick(palettes);
  const createGrid = () => {
    const points = [];
    const count = 30;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.09;

        let data = {
          u,
          v,
          color: random.pick(pallete),
          radius,
          rotation: random.noise2D(u, v),
        };

        points.push(data);
      }
    }
    return points;
  };

  // random.setSeed(511);
  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 400;

  return ({ context, width, height }) => {
    context.fillStyle = random.pick(pallete);
    // context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    points.forEach((data) => {
      const { u, v, color, radius, rotation } = data;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // Art
      /* context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      context.strokeStyle = color;
      context.lineWidth = "10";
      context.stroke(); */

      // Text
      context.save();
      // context.fillStyle = color;

      context.fillStyle = color;
      context.font = `${radius * width * 2}px "Helvetica"`;
      context.translate(x, y);
      context.rotate(rotation);

      // context.fillText(random.pick(["A", "B", "C", "+"]), x, y);
      context.fillText(random.pick(["="]), 0, 0);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
