import Tile from './tile';

class Map { constructor(scene, hexlength) { this.constructor(scene, hexlength) } }

Map.prototype.constructor = function (scene, hexlength) {

  this.hexlength = hexlength;
  this.hexheight = this.hexlength * Math.sin(Math.PI / 3) / Math.sin(Math.PI / 2);

  this.hex = new THREE.Shape();
  this.hex.moveTo(0, 0);
  this.hex.lineTo(-this.hexlength / 2, this.hexheight);
  this.hex.lineTo(0, this.hexheight * 2);
  this.hex.lineTo(this.hexlength, this.hexheight * 2);
  this.hex.lineTo(this.hexlength * 1.5, this.hexheight);
  this.hex.lineTo(this.hexlength, 0);
  this.hex.lineTo(0, 0);

  this.geometry = new THREE.ShapeGeometry(this.hex);
  this.geometry.rotateX(-Math.PI / 2)

  var tile;
  for (var i = -10; i < 10; i++) {
    for (var j = -13; j < 14; j++) {
      tile = new Tile(this.geometry, this.material);
      tile.mesh.material.color = new THREE.Color(Math.random() * 0xffffff);
      tile.mesh.position.x = j % 2 == 0 ? i * this.hexlength * 3 + (this.hexlength * 1.5) : i * this.hexlength * 3;
      tile.mesh.position.z = j * this.hexheight;
      scene.add(tile.mesh);
    }
  }

}

export default Map;