import * as THREE from 'three';

class Tile { constructor(map) { this.constructor(map) } }

Tile.prototype.constructor = function (map) {

  this.map = map;
  this.mesh = new THREE.Mesh(this.map.geometry, this.map.material);
  this.mesh.receiveShadow = true;

}

Tile.prototype.addSprite = function (name) {

  let sprite = this.createSprite(name);
  sprite.scale.set(5, 5, 5);
  sprite.position.set(this.mesh.position.x + this.map.hexheight, 1, this.mesh.position.z + this.map.hexlength / 2);
  this.map.mesh.add(sprite);

}

Tile.prototype.addYield = function (name) {

  let sprite = this.createYield(name);
  sprite.scale.set(2, 2, 2);
  sprite.position.set(this.mesh.position.x + this.map.hexheight, 1, this.mesh.position.z + this.map.hexlength / 2);
  this.map.mesh.add(sprite);

  // ToDo Group yields
  // this.map.yields.add(sprite);

}

Tile.prototype.createSprite = function (name) {

  return new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: this.map.world.textureloader.load(`./assets/sprites/${name}.png`)
    })
  );

}

Tile.prototype.createYield = function (name) {

  return new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: this.map.world.textureloader.load(`./assets/yields/${name}.png`)
    })
  );

}

Tile.prototype.addModel = function () {

  this.map.world.gltfloader.load('./assets/models/mountain/Mountain_01.gltf',
    (gltf) => {
      gltf.scene.position.copy(this.mesh.position);
      gltf.scene.position.x += this.map.hexheight;
      gltf.scene.position.z += this.map.hexlength / 2;
      gltf.scene.scale.set(1, 2, 3);
      this.map.world.scene.add(gltf.scene);
    },
    (xhr) => console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`),
    (err) => console.error('An error happened', err),
  );

}

export default Tile;