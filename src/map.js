import * as THREE from 'three';
import Water from './Water';
import SimplexNoise from 'simplex-noise';

const ocean = new THREE.Color(0x0f5e9c);
const snow = new THREE.Color(0xfffafa);

class Map { constructor(world, hexlength) { this.constructor(world, hexlength) } }

Map.prototype.constructor = function (world, hexlength) {

  this.world = world;

  this.hexlength = this.world.hexlength;
  this.hexheight = this.world.hexheight;

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


  this.hillsGeometry = new THREE.CylinderGeometry(0, 10, 0.1, 6, 3);
  this.hillsGeometry.verticesNeedUpdate = true;
  this.hillsGeometry.vertices[0].y = 20;
  this.hillsGeometry.vertices[8].y = 20;
  this.hillsGeometry.vertices[10].y = 2;
  this.hillsGeometry.vertices[12].y = 2;

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

  this.world.scene.add(this.yields);
  this.world.scene.add(this.mesh);

}

Map.prototype.noise = function (nx, ny) {
  return this.simplex.noise2D(nx, ny) / 2 + 0.5;
}

Map.prototype.newTile = function () {

  let tile = new THREE.Mesh(this.geometry, this.material);
  tile.receiveShadow = true;
  tile.castShadow = true;
  tile.userData = {
    world: this.world,
    map: this,
    units: [],
    yields: []
  }
  return tile;

}

Map.prototype.layer1 = function () {

  for (var y = 0; y < this.mapHeight; y++) {
    for (var x = 0; x < this.mapWidth; x++) {

      let tile = this.newTile();

      tile.position.x = x * this.hexheight * 2;
      tile.position.x += y % 2 == 0 ? this.hexheight : 0;
      tile.position.z = y * this.hexlength * 1.5;

      tile.position.x -= (this.mapWidth * this.hexheight);
      tile.position.z -= (this.mapHeight * this.hexlength);

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
        tile.userData.terrain = "TERRAIN_GRASS_MOUNTAIN";
        this.world.utils.addObject(tile, 'mountain');
        tile.material.color = new THREE.Color(`rgb(0%,${m}%,0%)`);
      } else if (m < 55 || distanceX > 40 || distanceY > 40) {
        tile.userData.terrain = "OCEAN";
        tile.position.y = -2;
        tile.material.color = ocean;
      } else {
        tile.userData.terrain = "GRASSLAND"
        tile.position.y = 0;
        tile.material.color = new THREE.Color(`rgb(0%,${m}%,0%)`);
      }

      this.mesh.add(tile);

    }

  }

}

Map.prototype.layer2 = function () {

  for (var y = 0; y < this.mapHeight; y++) {
    for (var x = 0; x < this.mapWidth; x++) {

      if (y == 0 || y == this.mapHeight - 1) {
        this.mapArray[y][x].material.color = snow;
        this.mapArray[y][x].position.y = 1;
      }

    }
  }

}

Map.prototype.layer3 = function () {

  for (var y = 1; y < this.mapHeight - 1; y++) {
    for (var x = 1; x < this.mapWidth - 1; x++) {

      var counter = 0;

      if (this.mapArray[y][x].userData.terrain != "OCEAN") {

        if (this.mapArray[y + 1][x].userData.terrain === "OCEAN") counter++;
        if (this.mapArray[y - 1][x].userData.terrain === "OCEAN") counter++;
        if (this.mapArray[y][x + 1].userData.terrain === "OCEAN") counter++;
        if (this.mapArray[y][x - 1].userData.terrain === "OCEAN") counter++;
        if (this.mapArray[y + 1][x - 1].userData.terrain === "OCEAN") counter++;
        if (this.mapArray[y - 1][x - 1].userData.terrain === "OCEAN") counter++;

        if (counter > 4) {
          this.mapArray[y][x].userData.terrain = "OCEAN"
          this.mapArray[y][x].material.color = ocean;
          this.mapArray[y][x].position.y = -2;
        }
      }

      counter = 0;

      if (this.mapArray[y][x].userData.terrain != "GRASSLAND") {

        if (this.mapArray[y + 1][x].userData.terrain == "GRASSLAND") counter++;
        if (this.mapArray[y - 1][x].userData.terrain == "GRASSLAND") counter++;
        if (this.mapArray[y][x + 1].userData.terrain == "GRASSLAND") counter++;
        if (this.mapArray[y][x - 1].userData.terrain == "GRASSLAND") counter++;
        if (this.mapArray[y + 1][x - 1].userData.terrain == "GRASSLAND") counter++;
        if (this.mapArray[y - 1][x - 1].userData.terrain == "GRASSLAND") counter++;

        if (counter > 4) {
          this.mapArray[y][x].userData.terrain = "GRASSLAND";
          this.mapArray[y][x].position.y = 0;
          this.mapArray[y][x].material.color = new THREE.Color(`rgb(0%,70%,0%)`);
        }
      }
    }
  }

}

Map.prototype.layer4 = function () {

  for (var y = 0; y < this.mapHeight; y++) {
    for (var x = 0; x < this.mapWidth; x++) {

      // this.world.utils.addSprite(this, this.mapArray[y][x], 'science');
      // this.world.utils.addSprite(this, this.mapArray[y][x], 'gold');

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
      waterNormals: this.world.loader.textures['waternormals'],
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