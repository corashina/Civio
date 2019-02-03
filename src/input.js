import * as THREE from 'three';

class Input { constructor(world) { this.constructor(world) } }

Input.prototype.constructor = function (world) {

  this.world = world;

  this.keys = [];
  this.cameraSpeed = 2;
  this.zoom = 5;
  this.zoomInLimit = 50;
  this.zoomOutLimit = 250;

  this.select = null;

}

Input.prototype.updateCamera = function () {

  if (this.keys[37]) this.world.camera.position.x += this.cameraSpeed;
  if (this.keys[38]) this.world.camera.position.z += this.cameraSpeed;
  if (this.keys[39]) this.world.camera.position.x -= this.cameraSpeed;
  if (this.keys[40]) this.world.camera.position.z -= this.cameraSpeed;

}

Input.prototype.onWheel = function (event) {

  let direction = this.world.camera.clone().getWorldDirection(new THREE.Vector3()).multiplyScalar(this.zoom);
  if (event.deltaY > 0) {
    if (this.world.camera.position.y - direction.y > this.zoomOutLimit) return;
    this.world.camera.translateZ(this.zoom)
  } else {
    if (this.world.camera.position.y + direction.y < this.zoomInLimit) return;
    this.world.camera.translateZ(-this.zoom);
  }

}

Input.prototype.onKeyUp = function (event) {

  this.keys[event.keyCode] = false;

}

Input.prototype.onKeyDown = function (event) {

  this.keys[event.keyCode] = true;

  switch (event.keyCode) {
    case 71:
      this.world.map.grid.visible = !this.world.map.grid.visible;
      break;
    case 89:
      this.world.map.yields.visible = !this.world.map.yields.visible;
      break;
    case 107:
      this.select.userData.addModel();
      break;
  }

}

Input.prototype.onMouseUp = function (event) {



}

Input.prototype.onMouseDown = function (event, e) {

  event.preventDefault();

  switch (event.which) {
    case 1:
      this.leftClick(e);
      break;
    case 2:
      this.middleClick(e);
      break;
    case 3:
      this.rightClick(e);
      break;
  }

}

Input.prototype.leftClick = function (e) {
  if (e.userData.units.length != 0) {
    this.select = e;

    this.world.scene.remove(this.ring);

    this.ring = new THREE.Mesh(
      new THREE.RingBufferGeometry(this.world.map.hexheight - 1, this.world.map.hexheight, 20, 5, 0, Math.PI * 2),
      new THREE.MeshBasicMaterial({ color: 0x8b0000, transparent: true, opacity: 0.5 })
    );
    this.ring.rotateX(-Math.PI / 2);

    this.ring.position.set(e.position.x + this.world.map.hexheight, 1, e.position.z + this.world.map.hexlength / 2);

    this.world.scene.add(this.ring);
  } else {
    this.world.scene.remove(this.ring);
    this.select = null;
  }

}

Input.prototype.middleClick = function (e) {

  this.select = e;

  this.world.scene.remove(this.ring);

  this.ring = new THREE.Mesh(
    new THREE.RingBufferGeometry(this.world.map.hexheight - 1, this.world.map.hexheight, 20, 5, 0, Math.PI * 2),
    new THREE.MeshBasicMaterial({ color: 0x8b0000, transparent: true, opacity: 0.5 })
  );
  this.ring.rotateX(-Math.PI / 2);

  this.ring.position.set(e.position.x + this.world.map.hexheight, 1, e.position.z + this.world.map.hexlength / 2);

  this.world.scene.add(this.ring);

}

Input.prototype.rightClick = function (e) {

  if (this.select.userData.units[0].length != 0) this.select.userData.units[0].move(e);
  this.world.scene.remove(this.ring);
  this.select = null;

}

Input.prototype.onMouseMove = function (event) {

  this.world.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  this.world.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

}

Input.prototype.onWindowResize = function () {

  this.world.camera.aspect = window.innerWidth / window.innerHeight;
  this.world.camera.updateProjectionMatrix();
  this.world.renderer.setSize(window.innerWidth, window.innerHeight);

}

export default Input;