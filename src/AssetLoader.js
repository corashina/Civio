import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import Resources from '../data/Resources';

class AssetLoader { constructor(world) { this.constructor(world) } }

AssetLoader.prototype.constructor = function (world) {

  this.world = world;

  this.manager = new THREE.LoadingManager();
  this.manager.onStart = (url, i, max) => console.log(`${(i / max * 100)}% loaded`)
  this.manager.onLoad = () => this.world.animate();
  this.manager.onProgress = (url, i, max) => console.log(`${(i / max * 100)}% loaded`);
  this.manager.onError = (err) => console.error(err);

  this.gltfloader = new GLTFLoader(this.manager);

  this.models = this.loadModels();

}

AssetLoader.prototype.loadModels = function () {

  const models = {}

  this.gltfloader.load('./assets/models/scout/scout.gltf', gltf => models['scout'] = gltf.scene);

  return models;

}

export default AssetLoader;