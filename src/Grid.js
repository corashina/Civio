import * as THREE from 'three';

class Grid { constructor(world) { this.constructor(world) } }

Grid.prototype.constructor = function (world) {

  this.world = world;

  this.geometry = new THREE.Shape();
  this.geometry.moveTo(0, 0);
  this.geometry.lineTo(-this.world.map.hexlength / 2, this.world.map.hexheight);
  this.geometry.lineTo(0, this.world.map.hexheight * 2);
  this.geometry.lineTo(this.world.map.hexlength, this.world.map.hexheight * 2);
  this.geometry.lineTo(this.world.map.hexlength * 1.5, this.world.map.hexheight);
  this.geometry.lineTo(this.world.map.hexlength, 0);
  this.geometry.lineTo(0, 0);

  this.line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(this.geometry.getPoints()),
    new THREE.LineBasicMaterial({ color: 0x000000, depthTest: false, depthWrite: false, transparent: true, opacity: 0.05 }));

  this.line.rotation.set(-Math.PI / 2, 0, -Math.PI / 2)

  this.mesh = new THREE.Group();

  for (var y = 0; y < this.world.map.mapHeight; y++) {
    for (var x = 0; x < this.world.map.mapWidth; x++) {

      this.line = this.line.clone();
      this.line.position.set(
        x * this.world.map.hexheight * 2 - (this.world.map.hexheight * this.world.map.mapWidth),
        0,
        y * this.world.map.hexlength * 1.5 - (this.world.map.hexlength * this.world.map.mapHeight));
      this.line.position.x += y % 2 == 0 ? this.world.map.hexheight : 0;
      this.mesh.add(this.line);

    }
  }

  this.world.map.grid = this.mesh;
  this.world.scene.add(this.mesh);

}

export default Grid;