class City { constructor(tile) { this.constructor(tile) } }

City.prototype.constructor = function (tile) {

  this.name = "W/E";
  // this.world = tile.userData.map.world 
  this.tile = tile;

  this.population = 0;
  this.housing = 0;
  this.amenities = 0;

  this.food = 0;
  this.production = 0;
  this.science = 0;
  this.culture = 0;
  this.faith = 0;
  this.gold = 0;

  this.gltf = this.tile.map.world.loader.models.city;
  this.gltf.scale.set(10, 10, 10);

  this.gltf.position.copy(this.tile.position);
  this.gltf.scene.position.x += this.tile.map.hexheight;
  this.gltf.scene.position.z += this.tile.map.hexlength / 2;

}

City.prototype.build = function () {



}

export default City;