import Sprite from './sprite';

class Tile { constructor(geometry, material) { this.constructor(geometry, material) } }

Tile.prototype.constructor = function (geometry, material) {

  this.mesh = new THREE.Mesh(geometry, material);

}

Tile.prototype.addSprite = function (hexlength, hexheight) {

  let sprite = new Sprite(new THREE.TextureLoader());
  sprite.mesh.position.x = this.mesh.position.x + hexheight;
  sprite.mesh.position.z = this.mesh.position.z + hexlength / 2;
  this.mesh.parent.add(sprite.mesh);

}

Tile.prototype.getNeighbours = function () {

  // this.mapArray[nx + 1][ny].material.color = desert;
  // this.mapArray[nx - 1][ny].material.color = desert;
  // this.mapArray[nx][ny + 1].material.color = desert;
  // this.mapArray[nx][ny - 1].material.color = desert;
  // this.mapArray[nx + 1][ny - 1].material.color = desert;
  // this.mapArray[nx - 1][ny - 1].material.color = desert;

}

export default Tile;