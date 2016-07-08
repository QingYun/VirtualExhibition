import THREE from 'three';

const data = window.VIRTUAL_EXHIBITION_DATA
  .reduce((acc, scene) => Object.assign(acc, { [scene.id]: scene }), {
    __DEFAULT: window.VIRTUAL_EXHIBITION_DATA[0]
  });

class DataLoader extends THREE.EventDispatcher {
  constructor() {
    super();
  }

  loadScene(scene_id = '__DEFAULT') {
    this.dispatchEvent(Object.assign(data[scene_id], {
      type: 'new scene'
    }));
  }
}

const ds = new DataLoader();

export default function getDataSource() {
  return ds;
}
