import Input from './input';
import Map from './map';
import Sprite from './sprite';

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

  // Renderer
  this.renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas'), antialias: true });
  this.renderer.shadowMap.enabled = true;
  this.renderer.setSize(window.innerWidth, window.innerHeight);

  this.raycaster = new THREE.Raycaster();
  this.mouse = new THREE.Vector2();

  var map = new Map(this.scene, 10);

  var spr = new Sprite(this.textureloader);
  this.scene.add(spr.mesh);

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
  window.addEventListener('wheel', (e) => this.input.onWheel(e), false)

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
  // intersects.forEach(e => console.log(e))

}

export default App;