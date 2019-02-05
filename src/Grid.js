import * as THREE from 'three';

class Grid { constructor(world) { this.constructor(world) } }

Grid.prototype.constructor = function (world) {

  this.world = world;

  this.geometry = new THREE.Geometry();

  this.hexGeometry = new THREE.RingGeometry(9.9, 10, 6);
  this.hexGeometry.rotateX(-Math.PI / 2);
  this.hexGeometry.rotateY(Math.PI / 2)

  this.hexMesh = new THREE.Mesh(this.hexGeometry);

  const width = this.world.map.mapWidth * this.world.map.hexheight;
  const height = this.world.map.mapHeight * this.world.map.hexlength;
  const hexlength = this.world.map.hexlength;
  const hexheight = this.world.map.hexheight;

  for (var y = 0; y < this.world.map.mapHeight; y++) {
    for (var x = 0; x < this.world.map.mapWidth; x++) {

      this.hex = this.hexMesh.clone();
      this.hex.position.set(x * hexheight * 2 - width, 0, y * hexlength * 1.5 - height);
      if (y % 2 == 0) this.hex.position.x += hexheight;
      this.hex.updateMatrix();
      this.geometry.merge(this.hex.geometry, this.hex.matrix);

    }
  }
  this.mesh = new THREE.Mesh(this.geometry,
    new THREE.MeshBasicMaterial({ color: 0x1e1e1e, depthTest: false }));

  this.mesh.position.x += this.world.map.hexheight;
  this.mesh.position.z += this.world.map.hexlength / 2;

  this.world.map.grid = this.mesh;
  this.world.scene.add(this.mesh);

}

export default Grid;