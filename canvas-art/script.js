// @ts-nocheck
import palettes from "nice-color-palettes";
import { lerp } from "canvas-sketch-util/math";
import random from "canvas-sketch-util/random";

// const palettes = require('nice-color-palettes')

const canvas_1 = document.querySelector("#canvas-1");
const canvas_2 = document.querySelector("#canvas-2");
const canvas_3 = document.querySelector("#canvas-3");
const canvas_4 = document.querySelector("#canvas-4");

const createGrid = (count) => {
  const points = [];

  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const u = x / (count - 1);
      const v = y / (count - 1);

      const point = {
        u,
        v,
        color: random.pick(random.pick(palettes)),
        radius: random.value(),
        rotation: random.noise2D(u, v),
      };

      points.push(point);
    }
  }
  return points;
};

const setCanvasSize = (canvas, size) => {
  console.log(canvas);
  canvas["height"] = size;
  canvas["width"] = size;
};

window.document.addEventListener("DOMContentLoaded", function () {
  const canvasSize = 380;

  setCanvasSize(canvas_1, canvasSize);
  setCanvasSize(canvas_2, canvasSize);
  setCanvasSize(canvas_3, canvasSize);
  setCanvasSize(canvas_4, canvasSize);

  loadCirle(canvas_1);
  loadText(canvas_2);
  loadArt(canvas_3);
  loadDots(canvas_4);
});

function fillCanvas(ctx, width, height) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
}

function loadCirle(canvas) {
  const ctx = canvas.getContext("2d");
  fillCanvas(ctx, canvas.width, canvas.height);
  const points = createGrid(10).filter(() => Math.random() < 0.5);
  points.forEach((data) => {
    const { u, v, color, radius } = data;
    const margin = 100;
    const x = lerp(margin, canvas.width - margin, u);
    const y = lerp(margin, canvas.height - margin, v);
    // art
    ctx.beginPath();
    ctx.arc(x, y, radius * 10, 0, Math.PI * 2, false);
    ctx.strokeStyle = localStorage.getItem("enableColor") ? color : "black";
    ctx.lineWidth = 20;
    ctx.fillStyle = color;
    ctx.stroke();
  });
}

function loadText(canvas) {
  const ctx = canvas.getContext("2d");
  fillCanvas(ctx, canvas.width, canvas.height);
  const points = createGrid(15).filter(() => Math.random() < 0.5);
  points.forEach((data) => {
    const { u, v, color, radius, rotation } = data;
    const margin = 100;
    const x = lerp(margin, canvas.width - margin, u);
    const y = lerp(margin, canvas.height - margin, v);
    // art
    ctx.save();
    ctx.fillStyle = localStorage.getItem("enableColor") ? color : "black";
    ctx.font = `50px "Helvetica"`;
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillText(random.pick(["="]), 0, 0);
    ctx.restore();
  });
}

function loadArt(canvas) {
  const ctx = canvas.getContext("2d");
  fillCanvas(ctx, canvas.width, canvas.height);
  const points = createGrid(20).filter(() => Math.random() < 0.5);
  points.forEach((data) => {
    const { u, v, color, radius, rotation } = data;
    const margin = 100;
    const x = lerp(margin, canvas.width - margin, u);
    const y = lerp(margin, canvas.height - margin, v);
    // art
    ctx.save();
    ctx.fillStyle = localStorage.getItem("enableColor") ? color : "black";
    ctx.font = `20px "Helvetica"`;
    if (random.value() > 0.5) {
      ctx.translate(x, y);
    } else {
      ctx.translate(y, x);
    }
    ctx.rotate(rotation);
    ctx.fillText(random.pick(["A", "B", "+", "Y", "Z"]), 0, 0);
    ctx.restore();
  });
}

function loadDots(canvas) {
  const ctx = canvas.getContext("2d");
  fillCanvas(ctx, canvas.width, canvas.height);
  const points = createGrid(30).filter(() => Math.random() < 0.5);
  points.forEach((data) => {
    const { u, v, color, radius } = data;
    const margin = 100;
    const x = lerp(margin, canvas.width - margin, u);
    const y = lerp(margin, canvas.height - margin, v);
    // art
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, Math.PI * 2, false);
    ctx.strokeStyle = localStorage.getItem("enableColor") ? color : "black";
    ctx.lineWidth = 4;
    ctx.fillStyle = localStorage.getItem("enableColor") ? color : "black";
    ctx.stroke();
  });
}
