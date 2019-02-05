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
      depthWrite: false,
      depthTest: false
    })
  );

}

Utils.prototype.addSprite = function (map, tile, name) {

  let sprite = this.createSprite(name);

  if (name == 'science' || name == 'gold' || name == 'culture' || name == 'production' || name == 'food') {
    sprite.scale.set(2, 2, 2);
  } else sprite.scale.set(5, 5, 5);

  tile.userData.yields.forEach(y => y.position.set(y.position.x + map.hexheight / 4, 0, y.position.z));
  let i = tile.userData.yields.length + 1;
  sprite.position.set(tile.position.x + i * map.hexheight, 0, tile.position.z + map.hexlength / 2);

  tile.userData.yields.push(sprite);
  map.yields.add(sprite);

}

Utils.prototype.center = function (object) {

  object.position.x += this.world.hexheight;
  object.position.z += this.world.hexlength / 2;

}

Utils.prototype.addObject = function (hex, name) {

  let object = this.world.loader.models[name].scene.clone();
  object.position.copy(hex.position);
  this.center(object)
  this.world.scene.add(object);

}

export default Utils;