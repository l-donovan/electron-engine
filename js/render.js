"use strict";

// This is an example of rendering a basic one-point
// perspective, with a vanishing point in the middle
// of the canvas.

var math = require("mathjs");

var renderCanvas = document.getElementById("render");
var renderContext = renderCanvas.getContext("2d");

var cursorPosX = getCanvasPointX(0);
var cursorPosY = getCanvasPointY(0);

var depthFactor = math.e;

class Point3D {
  constructor(x, y, z) {
    this.posX = ((x == 0) ? Number.MIN_VALUE : x); // Prevents "divide by zero" errors
    this.posY = y;
    this.posZ = z;

    this.drawX = math.sign(x) * math.pow(depthFactor, z) * math.cos(math.atan(y / x));
    this.drawY = math.sign(x) * math.pow(depthFactor, z) * math.sin(math.atan(y / x));
  }
}

function maximizeCanvas() {
  renderContext.canvas.width = window.innerWidth;
  renderContext.canvas.height = window.innerHeight;
}

function getCanvasPointX(x) {
  return math.floor(renderContext.canvas.width / 2 + x);
}

function getCanvasPointY(y) {
  return math.floor(renderContext.canvas.height / 2 + y);
}

function drawBackground(c) {
  renderContext.beginPath();
  renderContext.rect(0, 0, renderContext.canvas.width, renderContext.canvas.height);
  renderContext.fillStyle = c;
  renderContext.fill();
}

function drawToPoint(p, y, z) {
  renderContext.beginPath();
  renderContext.moveTo(cursorPosX, cursorPosY);
  if (typeof y === "undefined" && typeof z === "undefined"){
    cursorPosX = getCanvasPointX(p.drawX);
    cursorPosY = getCanvasPointY(p.drawY);
  } else {
    cursorPosX = getCanvasPointX(math.sign(p) * math.pow(depthFactor, z) * math.cos(math.atan(y / p)));
    cursorPosY = getCanvasPointX(math.sign(p) * math.pow(depthFactor, z) * math.sin(math.atan(y / p)));
  }
  renderContext.lineTo(cursorPosX, cursorPosY);
  renderContext.stroke();
}

function moveToPoint(p, y, z) {
  if (typeof y === "undefined" && typeof z === "undefined"){
    cursorPosX = getCanvasPointX(p.drawX);
    cursorPosY = getCanvasPointY(p.drawY);
  } else {
    cursorPosX = getCanvasPointX(math.sign(p) * math.pow(depthFactor, z) * math.cos(math.atan(y / p)));
    cursorPosY = getCanvasPointX(math.sign(p) * math.pow(depthFactor, z) * math.sin(math.atan(y / p)));
  }
}

function renderInit() {
  maximizeCanvas();
  drawBackground("#888");
  console.log("render.js initialized");
}

function draw() {
  moveToPoint(new Point3D(2, 1, 3));
  drawToPoint(new Point3D(2, 1, 4));
  drawToPoint(new Point3D(2, -1, 4));
  drawToPoint(new Point3D(2, -1, 3));
  drawToPoint(new Point3D(2, 1, 3));

  moveToPoint(2, 1, 4);
  drawToPoint(2, 1, 5);
  drawToPoint(2, -1, 5);
  drawToPoint(2, -1, 4);
  drawToPoint(2, 1, 4);

  moveToPoint(new Point3D(-2, 1, 3));
  drawToPoint(new Point3D(-2, 1, 4));
  drawToPoint(new Point3D(-2, -1, 4));
  drawToPoint(new Point3D(-2, -1, 3));
  drawToPoint(new Point3D(-2, 1, 3));
}
