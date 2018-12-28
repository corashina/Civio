import * as THREE from 'three';
import Water from './Water';
import Tile from './Tile';
import SimplexNoise from 'simplex-noise';
import Terrains from '../data/Terrains.json';
import Features from '../data/Features.json';
import Resources from '../data/Resources.json';

Terrains.GameInfo.Terrains.Row.forEach(e => console.log(e["-TerrainType"]));

const ocean = new THREE.Color(0x0f5e9c);
const snow = new THREE.Color(0xfffafa);


class Map { constructor(world, hexlength) { this.constructor(world, hexlength) } }

Map.prototype.constructor = function (world, hexlength) {

  this.world = world;
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

  this.mapWidth = 60;
  this.mapHeight = 34;

  this.simplex = new SimplexNoise();
  this.mapArray = Array(this.mapHeight + 1).fill().map(() => Array(this.mapWidth + 1).fill(0));

  this.mesh = new THREE.Group();
  this.yields = new THREE.Group();

  this.layer1(); // Intial simplex
  this.layer2(); // Snow
  this.layer3(); // Remove anomalies
  this.layer4(); // Resources
  this.layer5(); // Water

  this.world.scene.add(this.mesh);

}

Map.prototype.noise = function (nx, ny) {
  return this.simplex.noise2D(nx, ny) / 2 + 0.5;
}

Map.prototype.layer1 = function () {

  for (var y = 0; y < this.mapHeight; y++) {
    for (var x = 0; x < this.mapWidth; x++) {
      let tile = new Tile(this);
      tile.mesh.position.x = x * this.hexheight * 2;
      tile.mesh.position.x += y % 2 == 0 ? this.hexheight : 0;
      tile.mesh.position.z = y * this.hexlength * 1.5;
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

      if (m > 70) {
        // tile.type = "TERRAIN_GRASS_MOUNTAIN";
        tile.mesh.material.color = new THREE.Color(`rgb(0%,${m}%,0%)`);
        // tile.addModel('cattle');
      } else if (m < 55 || distanceX > 40 || distanceY > 40) {
        tile.type = "Water";
        tile.mesh.position.y = -2;
        tile.mesh.material.color = ocean;
      } else {
        tile.type = "Land"
        // tile.mesh.position.y = (m - 45) / 1;
        tile.mesh.position.y = 0;
        tile.mesh.material.color = new THREE.Color(`rgb(0%,${m}%,0%)`);
      }

      tile.mesh.position.x -= (this.mapWidth * this.hexheight);
      tile.mesh.position.z -= (this.mapHeight * this.hexlength);
      this.mesh.add(tile.mesh);

    }

  }

}

Map.prototype.layer2 = function () {

  for (var y = 0; y < this.mapHeight; y++) {
    for (var x = 0; x < this.mapWidth; x++) {

      if (y == 0 || y == this.mapHeight - 1) {
        this.mapArray[y][x].mesh.material.color = snow;
        this.mapArray[y][x].mesh.position.y = 1;
      }

    }
  }

}

Map.prototype.layer3 = function () {

  for (var y = 1; y < this.mapHeight - 1; y++) {
    for (var x = 1; x < this.mapWidth - 1; x++) {

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
          this.mapArray[y][x].mesh.position.y = -2;
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
          this.mapArray[y][x].type = "Land";
          this.mapArray[y][x].mesh.position.y = 0;
          this.mapArray[y][x].mesh.material.color = new THREE.Color(`rgb(0%,70%,0%)`);
        }
      }
    }
  }

}

Map.prototype.layer4 = function () {

  for (var y = 0; y <= this.mapHeight; y++) {
    for (var x = 0; x <= this.mapWidth; x++) {

      if (this.mapArray[y][x].type == "Land") {
        // this.mapArray[y][x].addSprite("copper");
        // this.mapArray[y][x].addYield("science");
      }

    }
  }
}

Map.prototype.layer5 = function () {

  let waterGeometry = new THREE.PlaneBufferGeometry(this.mapWidth * this.hexheight * 2, this.mapHeight * this.hexlength * 1.5);
  this.water = new Water(
    waterGeometry,
    {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: this.world.textureloader.load('./assets/waternormals.jpg',
        texture => texture.wrapS = texture.wrapT = THREE.RepeatWrapping),
      alpha: 0.5,
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 4.7,
    }
  );
  this.water.rotateX(- Math.PI / 2);
  this.water.position.y = -1;
  this.water.position.z -= this.hexlength * 9;
  this.world.scene.add(this.water);

}

export default Map;