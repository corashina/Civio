import * as THREE from 'three';

class Unit { constructor(world) { this.constructor(world) } }

Unit.prototype.constructor = function (tile) {

  this.tile = tile;

  this.unitName = '';
  this.experience = 0;
  this.movementPoints = 0;
  this.meleeStrength = 0;
  this.rangedStrength = 0;
  this.attackRange = 0;

  this.gltf = this.tile.map.world.loader.models.astronaut;
  this.gltf.scene.scale.set(250, 250, 250);
  this.gltf.scene.traverse((child) => { if (child.isMesh) child.castShadow = true });
  this.gltf.scene.position.copy(tile.mesh.position);

  const mixer = new THREE.AnimationMixer(this.gltf.scene);
  this.animationWalk = mixer.clipAction(this.gltf.animations[5]);
  this.tile.map.world.mixers.push(mixer);

  this.gltf.scene.position.x += this.tile.map.hexheight;
  this.gltf.scene.position.z += this.tile.map.hexlength / 2;

  this.tile.map.world.scene.add(this.gltf.scene);

}

Unit.prototype.move = function (hex) {

  let to = new THREE.Vector3().set(hex.position.x + hex.userData.map.hexheight, 0, hex.position.z + hex.userData.map.hexlength / 2);

  let direction = new THREE.Vector3().subVectors(to, this.gltf.scene.position).normalize();
  if (this.movement) return;

  this.gltf.scene.lookAt(to);
  this.animationWalk.play();

  this.movement = setInterval(() => {
    this.gltf.scene.position.x += direction.x;
    this.gltf.scene.position.z += direction.z;

    if (to.distanceTo(this.gltf.scene.position) < 3) {
      this.gltf.scene.position.x = to.x;
      this.gltf.scene.position.z = to.z;
      clearInterval(this.movement);
      this.movement = null;
      this.animationWalk.stop();
    }
  }, 16);

}

Unit.prototype.promote = function () {

}

export default Unit;