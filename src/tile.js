import * as THREE from 'three';

class Tile { constructor(map) { this.constructor(map) } }

Tile.prototype.constructor = function (map) {

  this.map = map;
  this.mesh = new THREE.Mesh(this.map.geometry, this.map.material);
  this.mesh.receiveShadow = true;

  this.yields = [];

}

Tile.prototype.addSprite = function (name) {

  let sprite = this.createSprite(name);

  if (name == 'science' || name == 'gold' || name == 'culture' || name == 'production' || name == 'food') {
    sprite.scale.set(2, 2, 2);
  } else sprite.scale.set(5, 5, 5);

  switch (this.yields.length) {
    case 0:
      sprite.position.set(this.mesh.position.x + this.map.hexheight, 0, this.mesh.position.z + this.map.hexlength / 2);
      break;
    case 1:
      this.yields[0].position.set(this.mesh.position.x + this.map.hexheight - 1.5, 0, this.mesh.position.z + this.map.hexlength / 2);
      sprite.position.set(this.mesh.position.x + this.map.hexheight + 1.5, 0, this.mesh.position.z + this.map.hexlength / 2);
      break;
    case 2:

      break;
    case 3:

      break;
  }


  this.map.yields.add(sprite);
  this.yields.push(sprite);

}

Tile.prototype.createSprite = function (name) {

  return new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: this.map.world.textureloader.load(`./assets/sprites/${name}.png`),
      depthTest: false,
      depthWrite: false
    })
  );

}

Tile.prototype.addModel = function (name) {


  var gltf = this.map.world.loader.models.scout;
  console.log(gltf)
  gltf.scene.position.copy(this.mesh.position);
  gltf.scene.position.x += this.map.hexheight;
  gltf.scene.position.z += this.map.hexlength / 2;
  this.map.world.scene.add(gltf.scene);

}

export default Tile;