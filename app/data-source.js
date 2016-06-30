import THREE from 'three';
import test_data from './data.js';
console.log(test_data);
class DataLoader extends THREE.EventDispatcher {
  constructor() {
    super();
  }

  loadScene(scene_id = 7) {
    this.dispatchEvent(Object.assign(test_data[scene_id], {
      type: 'new scene'
    }));
  }
}

const ds = new DataLoader();

export default function getDataSource() {
  return ds;
}
