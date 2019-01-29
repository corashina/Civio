class City { constructor() { this.constructor() } }

City.prototype.constructor = function () {

  this.name = "London";

  this.population = 0;
  this.housing = 0;
  this.amenities = 0;

  this.food = 0;
  this.production = 0;
  this.science = 0;
  this.culture = 0;
  this.faith = 0;
  this.gold = 0;

}

export default City;