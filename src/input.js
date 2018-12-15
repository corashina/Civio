class Input { constructor(world) { this.constructor(world) } }

Input.prototype.constructor = function (world) {

  this.world = world;
  this.keys = [];
  this.cameraSpeed = 2;
  this.zoom = 5;
  this.zoomInLimit = 50;
  this.zoomOutLimit = 150;

}


Input.prototype.updateCamera = function () {

  if (this.keys[37]) this.world.camera.position.x += this.cameraSpeed;
  if (this.keys[38]) this.world.camera.position.z += this.cameraSpeed;
  if (this.keys[39]) this.world.camera.position.x -= this.cameraSpeed;
  if (this.keys[40]) this.world.camera.position.z -= this.cameraSpeed;

}

Input.prototype.onWheel = function (event) {

  let direction = this.world.camera.clone().getWorldDirection().multiplyScalar(this.zoom);
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