class Tile { constructor() { this.constructor() } }

Tile.prototype.constructor = function () {

  var sqLength = 10;
  var height = sqLength * Math.sin(Math.PI / 3) / Math.sin(Math.PI / 2);

  this.hex = new THREE.Shape();
  this.hex.moveTo(0, 0);
  this.hex.lineTo(-sqLength / 2, height);
  this.hex.lineTo(0, height * 2);
  this.hex.lineTo(sqLength, height * 2);
  this.hex.lineTo(sqLength * 1.5, height);
  this.hex.lineTo(sqLength, 0);
  this.hex.lineTo(0, 0);

  this.geometry = new THREE.ShapeGeometry(this.hex);
  this.geometry.rotateX(-Math.PI / 2)
  this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  this.mesh = new THREE.Mesh(this.geometry, this.material);

}

export default Tile;