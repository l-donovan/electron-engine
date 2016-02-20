"use strict";

var math = require("mathjs");

class Scene3D {
  constructor(canvas, camera, viewer) {
    this.canvas = canvas;
    this.camera = camera;
    this.viewer = viewer;
    this.ctx = canvas.getContext("2d");
  }

  drawBackground(color) {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  maximizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  calcX(p) {
    var x = p.posX - this.camera.posX;
    var y = p.posY - this.camera.posY;
    var z = p.posZ - this.camera.posZ;

    var dz = math.cos(this.camera.aX) * (math.cos(this.camera.aY) * z + math.sin(this.camera.aY) * (math.sin(this.camera.aZ) * y + math.cos(this.camera.aZ) * x)) - math.sin(this.camera.aX) * (math.cos(this.camera.aZ) * y - math.sin(this.camera.aZ) * x);
    var dx = math.cos(this.camera.aY) * (math.sin(this.camera.aZ) * y + math.cos(this.camera.aZ) * x) - math.sin(this.camera.aY) * z;
    return (this.viewer.posZ / dz) * dx - this.viewer.posX;
  }

  calcY(p) {
    var x = p.posX - this.camera.posX;
    var y = p.posY - this.camera.posY;
    var z = p.posZ - this.camera.posZ;

    var dz = math.cos(this.camera.aX) * (math.cos(this.camera.aY) * z + math.sin(this.camera.aY) * (math.sin(this.camera.aZ) * y + math.cos(this.camera.aZ) * x)) - math.sin(this.camera.aX) * (math.cos(this.camera.aZ) * y - math.sin(this.camera.aZ) * x);
    var dy = math.sin(this.camera.aX) * (math.cos(this.camera.aY) * z + math.sin(this.camera.aY) * (math.sin(this.camera.aZ) * y + math.cos(this.camera.aZ) * x)) + math.cos(this.camera.aX) * (math.cos(this.camera.aZ) * y - math.sin(this.camera.aZ) * x);
    return (this.viewer.posZ / dz) * dy - this.viewer.posY;
  }

  drawLine(p1, p2) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.calcX(p1), this.calcY(p1));
    this.ctx.lineTo(this.calcX(p2), this.calcY(p2));
    this.ctx.stroke();
  }
}

class Camera3D {
  constructor(x, y, z, ax, ay, az) {
    this.posX = x;
    this.posY = y;
    this.posZ = z;
    this.aX = ax;
    this.aY = ay;
    this.aZ = az;
  }
}

class Viewer3D {
  constructor(x, y, z) {
    this.posX = x;
    this.posY = y;
    this.posZ = z;
  }
}

class Point3D {
  constructor(x, y, z) {
    this.posX = x;
    this.posY = y;
    this.posZ = z;
  }
}
