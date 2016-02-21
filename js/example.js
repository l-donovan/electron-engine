var canvas = document.getElementById("render");
var viewer = new Viewer3D(0, 0, 10);
var camera = new Camera3D(0, 0, 0, 0, 0, 0);
var scene = new Scene3D(canvas, camera, viewer);

scene.maximizeCanvas();

function viewerX(inc) {scene.viewer.posX += inc; scene.updateTrig(); drawScene();}
function viewerY(inc) {scene.viewer.posY += inc; scene.updateTrig(); drawScene();}
function viewerZ(inc) {scene.viewer.posZ += inc; scene.updateTrig(); drawScene();}
function cameraX(inc) {scene.camera.posX += inc; scene.updateTrig(); drawScene();}
function cameraY(inc) {scene.camera.posY += inc; scene.updateTrig(); drawScene();}
function cameraZ(inc) {scene.camera.posZ += inc; scene.updateTrig(); drawScene();}
function cameraAX(inc) {scene.camera.aX += inc; scene.updateTrig(); drawScene();}
function cameraAY(inc) {scene.camera.aY += inc; scene.updateTrig(); drawScene();}
function cameraAZ(inc) {scene.camera.aZ += inc; scene.updateTrig(); drawScene();}

function drawScene() {
  scene.drawBackground("#CCC");

  scene.drawLine(new Point3D(100, 100, 5), new Point3D(100, 50, 5));
  scene.drawLine(new Point3D(100, 50, 5), new Point3D(100, 50, 7));
  scene.drawLine(new Point3D(100, 50, 7), new Point3D(100, 100, 7));
  scene.drawLine(new Point3D(100, 100, 7), new Point3D(100, 100, 5));

  scene.fill([new Point3D(100, 100, 5),
              new Point3D(100, 50, 5),
              new Point3D(100, 50, 7),
              new Point3D(100, 100, 7)]);
}
