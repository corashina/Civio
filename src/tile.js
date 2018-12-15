class Tile { constructor(geometry, material) { this.constructor(geometry, material) } }

Tile.prototype.constructor = function (geometry, material) {

  this.mesh = new THREE.Mesh(geometry, material);

}

export default Tile;