import * as THREE from 'three';

class UI { constructor(world) { this.constructor(world) } }

UI.prototype.constructor = function (world) {

  this.world = world;

  this.iconSize = 16;

  // Scene
  this.scene = new THREE.Scene();

  // Camera
  this.camera = new THREE.OrthographicCamera(
    - window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, - window.innerHeight / 2, 1, 10);
  this.camera.position.z = 10;

  // Science
  this.science_yield = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.drawText("0") }));
  this.science_yield.center.set(0.0, 1.0);
  this.science_yield.scale.set(this.iconSize * 8, this.iconSize * 4, 1);
  this.scene.add(this.science_yield);
  this.science_yield.position.set(- window.innerWidth / 2, window.innerHeight / 2, 1);

  this.science = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.world.textureloader.load("./assets/sprites/science.png") }));
  this.science.center.set(0.0, 1.0);
  this.science.scale.set(this.iconSize, this.iconSize, 1);
  this.scene.add(this.science);
  this.science.position.set(- window.innerWidth / 2 + this.iconSize * 2, window.innerHeight / 2 - this.iconSize / 2, 1);

  // Culture
  this.culture_yield = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.drawText("0") }));
  this.culture_yield.center.set(0.0, 1.0);
  this.culture_yield.scale.set(this.iconSize * 8, this.iconSize * 4, 1);
  this.scene.add(this.culture_yield);
  this.culture_yield.position.set(- window.innerWidth / 2 + this.iconSize * 3, window.innerHeight / 2, 1);

  this.culture = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.world.textureloader.load("./assets/sprites/culture.png") }));
  this.culture.center.set(0.0, 1.0);
  this.culture.scale.set(this.iconSize, this.iconSize, 1);
  this.scene.add(this.culture);
  this.culture.position.set(-window.innerWidth / 2 + this.iconSize * 5, window.innerHeight / 2 - this.iconSize / 2, 1);

  // Faith
  this.faith_yield = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.drawText("0") }));
  this.faith_yield.center.set(0.0, 1.0);
  this.faith_yield.scale.set(this.iconSize * 8, this.iconSize * 4, 1);
  this.scene.add(this.faith_yield);
  this.faith_yield.position.set(- window.innerWidth / 2 + this.iconSize * 6, window.innerHeight / 2, 1);

  this.faith = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.world.textureloader.load("./assets/sprites/faith.png") }));
  this.faith.center.set(0.0, 1.0);
  this.faith.scale.set(this.iconSize, this.iconSize, 1);
  this.scene.add(this.faith);
  this.faith.position.set(-window.innerWidth / 2 + this.iconSize * 8, window.innerHeight / 2 - this.iconSize / 2, 1);

  // Gold
  this.gold_yield = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.drawText("0") }));
  this.gold_yield.center.set(0.0, 1.0);
  this.gold_yield.scale.set(this.iconSize * 8, this.iconSize * 4, 1);
  this.scene.add(this.gold_yield);
  this.gold_yield.position.set(- window.innerWidth / 2 + this.iconSize * 9, window.innerHeight / 2, 1);

  this.gold = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.world.textureloader.load("./assets/sprites/gold.png") }));
  this.gold.center.set(0.0, 1.0);
  this.gold.scale.set(this.iconSize, this.iconSize, 1);
  this.scene.add(this.gold);
  this.gold.position.set(-window.innerWidth / 2 + this.iconSize * 11, window.innerHeight / 2 - this.iconSize / 2, 1);

  // Left bottom
  this.left_bottom = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.world.textureloader.load("./assets/sprites/wheat.png") }));
  this.left_bottom.center.set(0.0, 0.0);
  this.left_bottom.scale.set(175, 175, 1);
  this.scene.add(this.left_bottom);

  this.left_bottom.position.set(-window.innerWidth / 2, -window.innerHeight / 2, 1);

}

UI.prototype.onWindowResize = function () {

  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  // this.camera.left = - window.innerWidth / 2;
  // this.camera.right = window.innerWidth / 2;
  // this.camera.top = window.innerHeight / 2;
  // this.camera.bottom = - window.innerHeight / 2;
  // this.camera.updateProjectionMatrix();

  // this.updateHUD();

  this.renderer.setSize(window.innerWidth, window.innerHeight);

}

UI.prototype.drawText = function (message) {

  var fontsize = 36;

  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  context.font = "Bold " + fontsize + "px Verdana";

  var msg = message.split('\n');

  context.fillStyle = "rgba(0, 0, 0, 1.0)";

  for (var i = 0; i < msg.length; i++) {
    context.fillText(msg[i], fontsize, fontsize * 1.4);
  }

  var texture = new THREE.Texture(canvas)
  texture.needsUpdate = true;

  return texture;

}

export default UI;