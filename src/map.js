import Tile from './tile';
import SimplexNoise from 'simplex-noise';

const grassland = new THREE.Color(0x3b5323);
const plains = new THREE.Color(0x7cfc00);
const desert = new THREE.Color(0xedc9af);
const tundra = new THREE.Color(0xc2b280);
const coast = new THREE.Color(0x74ccf4);
const lake = new THREE.Color(0x2389da);
const ocean = new THREE.Color(0x0f5e9c);
const snow = new THREE.Color(0xfffafa);


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
  this.geometry.rotateX(-Math.PI / 2);

  // Todo change shape to get rid of Y rotation
  this.geometry.rotateY(-Math.PI / 2);

  this.mapWidth = 20;
  this.mapHeight = 20;

  this.simplex1 = new SimplexNoise();
  this.simplex2 = new SimplexNoise();

  this.mapArray = Array(this.mapHeight + 1).fill().map(() => Array(this.mapWidth + 1).fill(0));

  this.mesh = new THREE.Group();

  for (var y = 0; y <= this.mapHeight; y++) {
    for (var x = 0; x <= this.mapWidth; x++) {
      let tile = new Tile(this.geometry, this.material);
      tile.mesh.position.x = -x * this.hexheight * 2;
      tile.mesh.position.x += y % 2 == 0 ? this.hexheight : 0;
      tile.mesh.position.z = -y * this.hexlength * 1.5;
      tile.mesh.userData = { y, x }
      this.mapArray[y][x] = tile;

      var nx = x / this.mapWidth - 0.5, ny = y / this.mapHeight - 0.5;
      var e = (0.84 * this.noise1(1 * nx, 1 * ny)
        + 0.50 * this.noise1(2 * nx, 2 * ny)
        + 0.25 * this.noise1(4 * nx, 4 * ny)
        + 0.13 * this.noise1(8 * nx, 8 * ny)
        + 0.06 * this.noise1(16 * nx, 16 * ny)
        + 0.03 * this.noise1(32 * nx, 32 * ny));
      e /= (0.84 + 0.50 + 0.25 + 0.13 + 0.06 + 0.03);
      e = Math.floor(Math.pow(e, 5.00) * 100);
      var m = (1.00 * this.noise2(1 * nx, 1 * ny)
        + 0.75 * this.noise2(2 * nx, 2 * ny)
        + 0.33 * this.noise2(4 * nx, 4 * ny)
        + 0.33 * this.noise2(8 * nx, 8 * ny)
        + 0.33 * this.noise2(16 * nx, 16 * ny)
        + 0.50 * this.noise2(32 * nx, 32 * ny));
      m /= (1.00 + 0.75 + 0.33 + 0.33 + 0.33 + 0.50);
      m = Math.floor(m * 100);

      let distanceX = Math.abs(this.mapWidth / 2 - x) / (this.mapWidth * 0.01);
      let distanceY = Math.abs(this.mapHeight / 2 - y) / (this.mapHeight * 0.01);

      if (m < 45 || distanceX > 40 || distanceY > 40) tile.mesh.material.color = ocean;
      else {
        tile.mesh.position.y = e / 10;
        tile.mesh.material.color = new THREE.Color(`rgb(${m}%,${m}%,${m}%)`);
      }

      this.mesh.add(tile.mesh)

    }
  }

  new THREE.Box3().setFromObject(this.mesh).getCenter(this.mesh.position).multiplyScalar(- 1);

  this.mapArray[0][1].addSprite(this.hexlength, this.hexheight);

  scene.add(this.mesh);

}

Map.prototype.noise1 = function (nx, ny) {
  return this.simplex1.noise2D(nx, ny) / 2 + 0.5;
}

Map.prototype.noise2 = function (nx, ny) {
  return this.simplex2.noise2D(nx, ny) / 2 + 0.5;
}

export default Map;