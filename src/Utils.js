import * as THREE from 'three';

class Utils { constructor(world) { this.constructor(world) } }

Utils.prototype.constructor = function (world) {

  this.world = world;

}

Utils.prototype.addIcon = function (object, icon_name) {

  let icon = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: this.world.loader[icon_name],
      depthWrite: false
    })
  )
  icon.scale.set(5, 5, 5);
  icon.position.copy(object.position);
  icon.position.y += 30;
  this.world.scene.add(icon);

}

Utils.prototype.createSprite = function (path) {

  return new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: this.world.loader.textures[path],
      depthWrite: false
    })
  );

}

Utils.prototype.addSprite = function (tile, name) {
  let sprite = this.createSprite(name);

  if (name == 'science' || name == 'gold' || name == 'culture' || name == 'production' || name == 'food') {
    sprite.scale.set(2, 2, 2);
  } else sprite.scale.set(5, 5, 5);

  switch (tile.userData.yields.length) {
    case 0:
      sprite.position.set(tile.position.x + this.world.map.hexheight, 0, tile.position.z + this.world.map.hexlength / 2);
      break;
    case 1:
      this.yields[0].position.set(tile.position.x + this.world.map.hexheight - 1.5, 0, tile.position.z + this.world.map.hexlength / 2);
      sprite.position.set(tile.position.x + this.world.map.hexheight + 1.5, 0, tile.position.z + this.world.map.hexlength / 2);
      break;
    case 2:
      this.yields[0].position.set(tile.position.x + this.world.map.hexheight)
      break;
    case 3:

      break;
  }

  this.world.scene.add(sprite);

}

Utils.prototype.centerHex = function (object, tile) {

  object.position.copy(tile.position);
  object.position.x += tile.map.hexheight;
  object.position.z += tile.map.hexlength / 2;

}

export default Utils;