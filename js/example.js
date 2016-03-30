var canvas = document.getElementById("render");
var viewer = new Viewer3D(0, 0, 10);
var camera = new Camera3D(0, 0, 0, 0, 0, 0);
var scene = new Scene3D(canvas, camera, viewer);

scene.maximizeCanvas();

scene.draw = function() {
  scene.drawBackground("#CCC");

  scene.drawLine(new Point3D(100, 100, 5), new Point3D(100, 50, 5));
  scene.drawLine(new Point3D(100, 50, 5), new Point3D(100, 50, 7));
  scene.drawLine(new Point3D(100, 50, 7), new Point3D(100, 100, 7));
  scene.drawLine(new Point3D(100, 100, 7), new Point3D(100, 100, 5));

  scene.drawLine(new Point3D(100, 100, 2), new Point3D(100, 100, 10));
  scene.drawLine(new Point3D(50, 100, 2), new Point3D(50, 100, 10));

  scene.fill([new Point3D(100, 100, 5),
              new Point3D(100, 50, 5),
              new Point3D(100, 50, 7),
              new Point3D(100, 100, 7)],
              "#CC4444");

  scene.fill([new Point3D(50, 100, 7),
              new Point3D(100, 100, 7),
              new Point3D(100, 50, 7),
              new Point3D(50, 50, 7)],
              "#44CCCC");
}

function mainLoop(tickLength) {
  setInterval(function() {
    scene.checkKeys();
    if (scene.getKeyState(37)) scene.cameraX(0.04);   // Left
    if (scene.getKeyState(38)) scene.cameraY(0.04);   // Up
    if (scene.getKeyState(39)) scene.cameraX(-0.04);  // Right
    if (scene.getKeyState(40)) scene.cameraY(-0.04);  // Down
    scene.draw();
  }, 1000. / tickLength)
}
