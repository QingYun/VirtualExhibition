import THREE from 'three';
import test_data from '../data.json';

class DataLoader extends THREE.EventDispatcher {
  constructor() {
    super();
  }

  loadScene(scene_id = 0) {
    this.dispatchEvent(Object.assign(test_data[scene_id], {
      type: 'new scene'
    }));
  }
}

const ds = new DataLoader();

export default function getDataSource() {
  return ds;
}