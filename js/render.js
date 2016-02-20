"use strict";

var math = require("mathjs");

class Scene3D {
  constructor(canvas, camera, viewer) {
    this.canvas = canvas;
    this.camera = camera;
    this.viewer = viewer;
    this.ctx = canvas.getContext("2d");
    this.updateTrig();
  }

  maximizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  updateTrig() {
    this.sX = math.sin(this.camera.aX);
    this.cX = math.cos(this.camera.aX);
    this.sY = math.sin(this.camera.aY);
    this.cY = math.cos(this.camera.aY);
    this.sZ = math.sin(this.camera.aZ);
    this.cZ = math.cos(this.camera.aZ);
  }

  drawBackground(color) {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  calcP(point) {
    var x = point.posX - this.camera.posX;
    var y = point.posY - this.camera.posY;
    var z = point.posZ - this.camera.posZ;

    var i1 = this.sZ * y + this.cZ * x;
    var i2 = this.cZ * y - this.sZ * x;
    var i3 = this.cY * z + this.sY * i1;

    var dx = this.cY * i1 - this.sY * z;
    var dy = this.sX * i3 + this.cX * i2;
    var dz = this.cX * i3 - this.sX * i2;

    return [(this.viewer.posZ / dz) * dx - this.viewer.posX, (this.viewer.posZ / dz) * dy - this.viewer.posY];
  }

  drawLine(p1, p2) {
    p1 = this.calcP(p1);
    p2 = this.calcP(p2);

    this.ctx.beginPath();
    this.ctx.moveTo(p1[0], p1[1]);
    this.ctx.lineTo(p2[0], p2[1]);
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
