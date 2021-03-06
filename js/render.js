"use strict";

var $ = require("jquery")

class Scene3D {
  constructor(canvas, camera, viewer) {
    this.draw = function() {};
    this.keyStates = [];
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
    this.sX = Math.sin(this.camera.aX);
    this.cX = Math.cos(this.camera.aX);
    this.sY = Math.sin(this.camera.aY);
    this.cY = Math.cos(this.camera.aY);
    this.sZ = Math.sin(this.camera.aZ);
    this.cZ = Math.cos(this.camera.aZ);
  }

  drawBackground(color) {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  calcPoint(point) {
    var x = point.posX - this.camera.posX;
    var y = point.posY - this.camera.posY;
    var z = point.posZ - this.camera.posZ;

    var i1 = this.sZ * y + this.cZ * x;
    var i2 = this.cZ * y - this.sZ * x;
    var i3 = this.cY * z + this.sY * i1;

    var dx = this.cY * i1 - this.sY * z;
    var dy = this.sX * i3 + this.cX * i2;
    var dz = this.cX * i3 - this.sX * i2;

    return [(this.viewer.posZ / dz) * dx - this.viewer.posX,
            (this.viewer.posZ / dz) * dy - this.viewer.posY];
  }

  drawLine(p1, p2) {
    p1 = this.calcPoint(p1);
    p2 = this.calcPoint(p2);

    this.ctx.beginPath();
    this.ctx.moveTo(p1[0], p1[1]);
    this.ctx.lineTo(p2[0], p2[1]);
    this.ctx.stroke();
  }

  fill(polygon, color) {
    polygon = polygon.map(p => this.calcPoint(p));
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(polygon[0][0], polygon[0][1]);
    for (var i = 0; i < polygon.length; i++)
      this.ctx.lineTo(polygon[i][0], polygon[i][1]);
    this.ctx.closePath();
    this.ctx.fill();
  }

  viewerX(inc) {
    this.viewer.posX += inc;
    this.updateTrig();
  }

  viewerY(inc) {
    this.viewer.posY += inc;
    this.updateTrig();
  }

  viewerZ(inc) {
    this.viewer.posZ += inc;
    this.updateTrig();
  }

  cameraX(inc) {
    this.camera.posX += inc;
    this.updateTrig();
  }

  cameraY(inc) {
    this.camera.posY += inc;
    this.updateTrig();
  }

  cameraZ(inc) {
    this.camera.posZ += inc;
    this.updateTrig();
  }

  cameraAX(inc) {
    this.camera.aX += inc;
    this.updateTrig();
  }

  cameraAY(inc) {
    this.camera.aY += inc;
    this.updateTrig();
  }

  cameraAZ(inc) {
    this.camera.aZ += inc;
    this.updateTrig();
  }

  checkKeys() {
    var t = this;

    $("body").keydown(function(e) {
      t.keyStates[e.keyCode] = 1;
    });

    $("body").keyup(function(e) {
      t.keyStates[e.keyCode] = 0;
    });
  }

  getKeyState(key) {
    return this.keyStates[key];
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

function executionTime(func) {
  var ti = performance.now();
  func();
  return performance.now() - ti;
}
