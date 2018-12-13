import Tile from './tile';

class App { }

App.prototype.init = function () {

  // Scene
  this.scene = new THREE.Scene();

  // Renderer
  this.renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas'), antialias: true });
  this.renderer.shadowMap.enabled = true;
  this.renderer.setSize(window.innerWidth, window.innerHeight);

  var t1 = new Tile();
  this.scene.add(t1.mesh);

  // Camera
  this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 50, 200);
  this.camera.position.set(10, 100, 10);
  this.controls = new THREE.MapControls(this.camera, this.renderer.domElement);

}

App.prototype.render = function () {
  this.controls.update();
  this.renderer.render(this.scene, this.camera);

}

App.prototype.animate = function () {

  requestAnimationFrame(() => this.animate());
  this.render();

}

App.prototype.onWindowResize = function () {

  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(window.innerWidth, window.innerHeight);

}

export default App;