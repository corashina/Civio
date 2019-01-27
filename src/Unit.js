class Unit { constructor(world) { this.constructor(world) } }

Unit.prototype.constructor = function (world) {

  this.world = world;

  this.unitName = '';
  this.experience = 0;
  this.movementPoints = 0;
  this.meleeStrength = 0;
  this.rangedStrength = 0;
  this.attackRange = 0;

  console.log(this.world.loader.models.astronaut)
  // this.mesh = this.world.loader.assetloader
  // this.world.scene.add(this.mesh)

}

Unit.prototype.promote = function () {

}

export default Unit;