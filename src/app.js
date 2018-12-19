import Input from './input';
import Map from './map';

class App { }

App.prototype.init = function () {

  // Scene
  this.scene = new THREE.Scene();
  this.textureloader = new THREE.TextureLoader();
  this.scene.background = this.textureloader.load('./assets/ui/background.png');

  var plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1193, 667, 32),
    new THREE.MeshBasicMaterial({ map: this.textureloader.load('./assets/ui/background.png') }));
  plane.rotateX(-Math.PI / 2);
  plane.position.y -= 100;
  this.scene.add(plane);

  this.intersected = null;

  // Renderer
  this.renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas'), antialias: true });
  this.renderer.shadowMap.enabled = true;
  this.renderer.setSize(window.innerWidth, window.innerHeight);

  this.raycaster = new THREE.Raycaster();
  this.mouse = new THREE.Vector2();

  this.map = new Map(this.scene, 10);

  this.input = new Input(this);

  // Camera
  this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
  this.camera.position.set(0, 100, -50);
  this.camera.lookAt(0, 0, 0);

  // Events
  window.addEventListener('resize', (e) => this.input.onWindowResize(e), false);
  window.addEventListener('mousemove', (e) => this.input.onMouseMove(e), false);
  window.addEventListener('keyup', (e) => this.input.onKeyUp(e), false);
  window.addEventListener('keydown', (e) => this.input.onKeyDown(e), false);
  window.addEventListener('mousedown', (e) => this.input.onMouseDown(e, this.intersected), false);
  window.addEventListener('mouseup', (e) => this.input.onMouseUp(e), false);
  window.addEventListener('wheel', (e) => this.input.onWheel(e), { passive: false });

}

App.prototype.render = function () {

  this.raycast();
  this.input.updateCamera();

  this.renderer.render(this.scene, this.camera);

}

App.prototype.animate = function () {

  requestAnimationFrame(() => this.animate());
  this.render();

}


App.prototype.raycast = function () {

  this.raycaster.setFromCamera(this.mouse, this.camera);
  let intersects = this.raycaster.intersectObjects(this.scene.children);
  if (intersects.length > 0) {
    if (intersects[0].object != this.intersected) this.intersected = intersects[0].object;
  } else this.intersected = null;

}

export default App;