import * as THREE from 'three';

class Light { constructor(world) { this.constructor(world) } }

Light.prototype.constructor = function (world) {

  this.world = world;

  this.mesh = new THREE.DirectionalLight(0xffffff, 1, 100);
  this.mesh.position.set(0, 100, 0);
  this.mesh.castShadow = true;

  this.mesh.shadow.mapSize.width = 512;
  this.mesh.shadow.mapSize.height = 512;
  this.mesh.shadow.camera.near = 95;
  this.mesh.shadow.camera.far = 100;
  this.mesh.shadow.camera.left = -this.world.map.hexheight * this.world.map.mapWidth;
  this.mesh.shadow.camera.right = this.world.map.hexheight * this.world.map.mapWidth;
  this.mesh.shadow.camera.top = this.world.map.hexlength * this.world.map.mapHeight;
  this.mesh.shadow.camera.bottom = -this.world.map.hexlength * this.world.map.mapHeight / 2;

  // this.helper = new THREE.CameraHelper(this.mesh.shadow.camera);
  // this.world.scene.add(this.helper);

  this.world.scene.add(this.mesh);


}

export default Light;