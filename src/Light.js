class Light { constructor(world) { this.constructor(world) } }

Light.prototype.constructor = function (world) {

  this.world = world;

  this.mesh = new THREE.DirectionalLight(0xffffff, 1, 100);
  this.mesh.position.set(-20, 50, 0);
  this.mesh.castShadow = true;

  this.mesh.shadow.mapSize.width = 512;
  this.mesh.shadow.mapSize.height = 512;
  this.mesh.shadow.camera.near = 0.5;
  this.mesh.shadow.camera.far = 500;
  this.mesh.shadowCameraLeft = -10;
  this.mesh.shadowCameraRight = 10;
  this.mesh.shadowCameraTop = 10;
  this.mesh.shadowCameraBottom = -10;

  this.helper = new THREE.CameraHelper(this.mesh.shadow.camera);

  this.world.scene.add(this.mesh);
  this.world.scene.add(this.helper);

}

export default Light;