import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';

class Loader { constructor(world) { this.constructor(world) } }

Loader.prototype.constructor = function (world) {

  this.world = world;

  this.manager = new THREE.LoadingManager();
  this.manager.onStart = (url, i, max) => console.log(`${(i / max * 100)}% loaded`)
  this.manager.onLoad = () => this.world.constructor();
  this.manager.onProgress = (url, i, max) => console.log(`${(i / max * 100)}% loaded`);
  this.manager.onError = (err) => console.error(err);

  this.textureloader = new THREE.TextureLoader(this.manager);
  this.gltfloader = new GLTFLoader(this.manager);

  this.models = this.loadModels();
  this.textures = this.loadTextures();

}

Loader.prototype.loadModels = function () {

  const models = {}

  this.gltfloader.load('../assets/models/astronaut/astronaut.gltf', gltf => models['astronaut'] = gltf);
  this.gltfloader.load('../assets/models/mountain/mountain.gltf', gltf => models['mountain'] = gltf);

  return models;

}

Loader.prototype.loadTextures = function () {

  const textures = {}

  this.textureloader.load('../assets/yields/science.png', image => textures['science'] = image);
  this.textureloader.load('../assets/yields/faith.png', image => textures['faith'] = image);
  this.textureloader.load('../assets/yields/gold.png', image => textures['gold'] = image);
  this.textureloader.load('../assets/yields/culture.png', image => textures['culture'] = image);
  this.textureloader.load('../assets/yields/food.png', image => textures['food'] = image);
  this.textureloader.load('../assets/yields/production.png', image => textures['production'] = image);

  this.textureloader.load('../assets/sprites/wheat.png', image => textures['wheat'] = image);

  this.textureloader.load('../assets/units/warrior.png', image => textures['warrior'] = image);

  this.textureloader.load('./assets/ui/waternormals.jpg', function (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    textures['waternormals'] = texture;
  });

  return textures;

}

export default Loader;