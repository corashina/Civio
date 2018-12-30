class Unit { constructor(world) { this.constructor(world) } }

Unit.prototype.constructor = function (world) {

  this.world = world;

  this.unitName = '';
  this.experience = 0;
  this.movementPoints = 0;
  this.meleeStrength = 0;
  this.rangedStrength = 0;
  this.attackRange = 0;

  this.mesh = this.world.loader.models.scout;
  this.world.scene.add(this.mesh);

}

Unit.prototype.promote = function () {

}

export default Unit;