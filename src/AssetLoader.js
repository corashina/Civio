import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';

class AssetLoader { constructor(world) { this.constructor(world) } }

AssetLoader.prototype.constructor = function (world) {

  this.world = world;

  this.manager = new THREE.LoadingManager();
  this.manager.onStart = (url, i, max) => console.log(`${(i / max * 100)}% loaded`)
  this.manager.onLoad = () => this.world.animate();
  this.manager.onProgress = (url, i, max) => console.log(`${(i / max * 100)}% loaded`);
  this.manager.onError = (err) => console.error(err);

  this.gltfloader = new GLTFLoader(this.manager);
  this.textureloader = new THREE.TextureLoader(this.manager);

  this.models = this.loadModels();
  this.textures = this.loadTextures();

}

AssetLoader.prototype.loadModels = function () {

  const models = {}

  this.gltfloader.load('./assets/models/astronaut/astronaut.gltf', gltf => models['astronaut'] = gltf);

  return models;

}

AssetLoader.prototype.loadTextures = function () {

  const textures = {}

  this.textureloader.load('./assets/units/warrior.png', image => textures['warrior'] = image);

  return textures;

}


export default AssetLoader;