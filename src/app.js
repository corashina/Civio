import * as THREE from 'three';
import Stats from 'stats-js';

import AssetLoader from './AssetLoader';
import Input from './Input';
import Map from './Map';
import Grid from './Grid';
import UI from './UI';
import Unit from './Unit';
import Light from './Light';

class App { constructor() { this.constructor() } }

App.prototype.constructor = function () {

  // Scene
  this.scene = new THREE.Scene();

  this.loader = new AssetLoader(this);
  this.textureloader = new THREE.TextureLoader(this.loader.manager);

  this.stats = new Stats();
  this.stats.showPanel(0);
  document.body.appendChild(this.stats.dom);
  this.intersected = null;

  // Renderer
  this.renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas'), antialias: true });
  this.renderer.shadowMap.enabled = true;
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  this.renderer.autoClear = false;

  this.raycaster = new THREE.Raycaster();
  this.mouse = new THREE.Vector2();

  this.map = new Map(this, 10);
  this.io = new Input(this);
  this.interface = new UI(this);
  this.grid = new Grid(this);

  // this.light = new Light(this);

  // var tooltip = new Tooltip('Hello\nxD');
  // tooltip.mesh.position.set(0, 10, 0);
  // this.scene.add(tooltip.mesh);

  // Camera
  this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
  this.camera.position.set(0, 200, -100);
  this.camera.lookAt(0, 0, 0);

  // Events
  window.addEventListener('resize', (e) => this.io.onWindowResize(e), false);
  window.addEventListener('mousemove', (e) => this.io.onMouseMove(e), false);
  window.addEventListener('keyup', (e) => this.io.onKeyUp(e), false);
  window.addEventListener('keydown', (e) => this.io.onKeyDown(e), false);
  window.addEventListener('mousedown', (e) => this.io.onMouseDown(e, this.intersected), false);
  window.addEventListener('mouseup', (e) => this.io.onMouseUp(e), false);
  window.addEventListener('wheel', (e) => this.io.onWheel(e), { passive: false });

}

App.prototype.render = function () {

  this.stats.begin();

  this.raycast();
  this.io.updateCamera();

  this.map.water.material.uniforms.time.value += 0.01;

  this.renderer.render(this.scene, this.camera);
  this.renderer.render(this.interface.scene, this.interface.camera);

  this.stats.end();

}

App.prototype.animate = function () {

  requestAnimationFrame(() => this.animate());
  this.render();

}


App.prototype.raycast = function () {

  this.raycaster.setFromCamera(this.mouse, this.camera);
  let intersects = this.raycaster.intersectObjects(this.map.mesh.children);
  if (intersects.length > 0) {
    if (intersects[0].object != this.intersected) this.intersected = intersects[0].object;
  } else this.intersected = null;

}

export default App;