class Sprite { constructor(loader) { this.constructor(loader) } }

Sprite.prototype.constructor = function (loader) {

  this.mesh = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: loader.load("./assets/sprites/copper.png")
    })
  );
  this.mesh.position.x += 10 / 2;
  this.mesh.position.y += 1;
  this.mesh.scale.set(5, 5, 5);

}

export default Sprite;