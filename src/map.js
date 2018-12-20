import Tile from './Tile';
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

  this.mapWidth = 40;
  this.mapHeight = 40;

  this.simplex = new SimplexNoise();
  this.mesh = new THREE.Group();
  this.mapArray = Array(this.mapHeight + 1).fill().map(() => Array(this.mapWidth + 1).fill(0));

  this.layer1();
  this.layer2(); // Snow
  this.layer3(); // Remove 

  new THREE.Box3().setFromObject(this.mesh).getCenter(this.mesh.position).multiplyScalar(- 1);

  this.mapArray[0][1].addSprite(this.hexlength, this.hexheight);

  scene.add(this.mesh);

}

Map.prototype.noise = function (nx, ny) {
  return this.simplex.noise2D(nx, ny) / 2 + 0.5;
}

Map.prototype.layer1 = function () {

  for (var y = 0; y <= this.mapHeight; y++) {
    for (var x = 0; x <= this.mapWidth; x++) {
      let tile = new Tile(this.geometry, this.material);
      tile.mesh.position.x = -x * this.hexheight * 2;
      tile.mesh.position.x += y % 2 == 0 ? this.hexheight : 0;
      tile.mesh.position.z = -y * this.hexlength * 1.5;
      tile.mesh.userData = { x, y }
      this.mapArray[y][x] = tile;

      var nx = x / this.mapWidth - 0.5, ny = y / this.mapHeight - 0.5;
      var m = (1.00 * this.noise(1 * nx, 1 * ny)
        + 0.75 * this.noise(2 * nx, 2 * ny)
        + 0.33 * this.noise(4 * nx, 4 * ny)
        + 0.33 * this.noise(8 * nx, 8 * ny)
        + 0.33 * this.noise(16 * nx, 16 * ny)
        + 0.50 * this.noise(32 * nx, 32 * ny));
      m /= (1.00 + 0.75 + 0.33 + 0.33 + 0.33 + 0.50);
      m = Math.floor(m * 100);

      let distanceX = Math.abs(this.mapWidth / 2 - x) / (this.mapWidth * 0.01);
      let distanceY = Math.abs(this.mapHeight / 2 - y) / (this.mapHeight * 0.01);

      if (m < 55 || distanceX > 40 || distanceY > 40) {
        tile.type = "Water"
        tile.mesh.material.color = ocean;
      }
      else {
        tile.type = "Land"
        tile.mesh.position.y = (m - 45) / 10;
        tile.mesh.material.color = new THREE.Color(`rgb(0%,${m}%,0%)`);
      }

      this.mesh.add(tile.mesh)

    }
  }

}

Map.prototype.layer2 = function () {

  for (var y = 0; y <= this.mapHeight; y++) {
    for (var x = 0; x <= this.mapWidth; x++) {

      if (y == 0 || y == this.mapHeight) {
        this.mapArray[y][x].mesh.material.color = snow;
        this.mapArray[y][x].mesh.position.y = 2;
      }

    }
  }

}

Map.prototype.layer3 = function () {

  for (var y = 1; y <= this.mapHeight - 1; y++) {
    for (var x = 1; x <= this.mapWidth - 1; x++) {

      var counter = 0;
      if (this.mapArray[y][x].type != "Water") {
        if (this.mapArray[y + 1][x].type == "Water") counter++;
        if (this.mapArray[y - 1][x].type == "Water") counter++;
        if (this.mapArray[y][x + 1].type == "Water") counter++;
        if (this.mapArray[y][x - 1].type == "Water") counter++;
        if (this.mapArray[y + 1][x - 1].type == "Water") counter++;
        if (this.mapArray[y - 1][x - 1].type == "Water") counter++;
        if (counter > 4) {
          this.mapArray[y][x].type = "Water"
          this.mapArray[y][x].mesh.material.color = ocean;
          this.mapArray[y][x].mesh.position.y = 0;
        }
      }

      counter = 0;
      if (this.mapArray[y][x].type != "Land") {
        if (this.mapArray[y + 1][x].type == "Land") counter++;
        if (this.mapArray[y - 1][x].type == "Land") counter++;
        if (this.mapArray[y][x + 1].type == "Land") counter++;
        if (this.mapArray[y][x - 1].type == "Land") counter++;
        if (this.mapArray[y + 1][x - 1].type == "Land") counter++;
        if (this.mapArray[y - 1][x - 1].type == "Land") counter++;
        if (counter > 4) {
          this.mapArray[y][x].type = "Land"
          this.mapArray[y][x].mesh.material.color = new THREE.Color(`rgb(0%,70%,0%)`);
        }
      }
    }
  }

}

export default Map;