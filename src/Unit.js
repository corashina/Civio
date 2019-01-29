import * as THREE from 'three';

class Unit { constructor(world) { this.constructor(world) } }

Unit.prototype.constructor = function (tile) {

  this.tile = tile;

  // Properties
  this.experience = 0;
  this.movementPoints = 0;
  this.meleeStrength = 0;
  this.rangedStrength = 0;
  this.attackRange = 0;

  // Model
  this.gltf = this.tile.map.world.loader.models.astronaut;
  this.gltf.scene.scale.set(250, 250, 250);
  this.gltf.scene.traverse((child) => { if (child.isMesh) child.castShadow = true });

  this.gltf.scene.position.copy(tile.mesh.position);
  this.gltf.scene.position.x += this.tile.map.hexheight;
  this.gltf.scene.position.z += this.tile.map.hexlength / 2;

  // Icon
  this.icon = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: this.tile.map.world.loader.warrior,
      depthTest: true,
      depthWrite: false
    })
  )
  this.icon.scale.set(5, 5, 5);
  this.icon.position.copy(this.gltf.scene.position);
  this.icon.position.y += 30;
  this.tile.map.world.scene.add(this.icon);

  // Animations
  this.mixer = new THREE.AnimationMixer(this.gltf.scene);
  this.animationWalk = this.mixer.clipAction(this.gltf.animations[5]);
  this.tile.map.world.mixers.push(this.mixer);

  this.tile.map.world.scene.add(this.gltf.scene);

}

Unit.prototype.move = function (hex) {


  let destination = new THREE.Vector3().set(hex.position.x + hex.userData.map.hexheight, 0, hex.position.z + hex.userData.map.hexlength / 2);

  let direction = new THREE.Vector3().subVectors(destination, this.gltf.scene.position).normalize();
  if (this.movement) return;

  this.gltf.scene.lookAt(destination);
  this.animationWalk.play();

  this.tile.units.pop();
  hex.userData.units.push(this);

  this.movement = setInterval(() => this.moveInterval(direction, destination), 16);

}

Unit.prototype.moveInterval = function (direction, destination) {

  this.gltf.scene.position.x += direction.x;
  this.gltf.scene.position.z += direction.z;

  if (destination.distanceTo(this.gltf.scene.position) < 3) {
    this.gltf.scene.position.x = destination.x;
    this.gltf.scene.position.z = destination.z;
    clearInterval(this.movement);
    this.movement = null;
    this.animationWalk.stop();
  }

}

Unit.prototype.promote = function () {

}

export default Unit;