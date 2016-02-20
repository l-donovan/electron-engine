var canvas = document.getElementById("render");
var viewer = new Viewer3D(0, 0, 10);
var camera = new Camera3D(0, 0, 0, 0, 0, 0);
var scene = new Scene3D(canvas, camera, viewer);

scene.maximizeCanvas();

function viewerX(inc) {scene.viewer.posX += inc; drawScene();}
function viewerY(inc) {scene.viewer.posY += inc; drawScene();}
function viewerZ(inc) {scene.viewer.posZ += inc; drawScene();}
function cameraX(inc) {scene.camera.posX += inc; drawScene();}
function cameraY(inc) {scene.camera.posY += inc; drawScene();}
function cameraZ(inc) {scene.camera.posZ += inc; drawScene();}
function cameraAX(inc) {scene.camera.aX += inc; drawScene();}
function cameraAY(inc) {scene.camera.aY += inc; drawScene();}
function cameraAZ(inc) {scene.camera.aZ += inc; drawScene();}

function drawScene() {
  scene.drawBackground("#AAA");
  scene.drawLine(new Point3D(100, 100, 3), new Point3D(100, 100, 9));
  scene.drawLine(new Point3D(100, 100, 5), new Point3D(100, 50, 5));
  scene.drawLine(new Point3D(100, 100, 7), new Point3D(100, 50, 7));
  scene.drawLine(new Point3D(100, 50, 5), new Point3D(100, 50, 7));
}
