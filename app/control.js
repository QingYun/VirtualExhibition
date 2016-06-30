import THREE from 'three';
import SAT from 'sat';
const OrbitControls = require(
  'imports?THREE=THREE!exports?THREE.OrbitControls!./vender/OrbitControls.js');

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

class Control extends THREE.EventDispatcher {
  constructor({ listenDOM, scene, camera }) {
    super();
    this.controls = new OrbitControls(camera.getCamera(), listenDOM);
    this.controls.autoRotate = true;
    this.controls.autoRotateRestoreInterval = __DEV__ ? 3600 : 60;

    this.reset({ width: 0, height: 0 });
    listenDOM.addEventListener('click', (event) => {
      mouse.x = (event.clientX / listenDOM.clientWidth) * 2 - 1;
      mouse.y = - (event.clientY / listenDOM.clientHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera.getCamera());
      const [intersect] = raycaster.intersectObject(scene.getSphereMesh());

      if (intersect === undefined) return;

      const { width, height } = scene.getDimensions();
      const [x, y] = [intersect.uv.x * width, (1 - intersect.uv.y) * height];
      const point = new SAT.Vector(x, y);
      this.clickables.forEach(({ action, polygon }) => {
        if (SAT.pointInPolygon(point, polygon)) {
          this.dispatchEvent(Object.assign({ type: 'action' }, action));
        }
      });
    });
  }

  updateCamera() {
    this.controls.update();
  }

  reset() {
    this.clickables = [];
  }

  addClickables(future_clickables) {
    future_clickables.map((future_clickable) =>
      future_clickable.then(({ polygon, action }) =>
        this.clickables.push({
          polygon: new SAT.Polygon(
                    new SAT.Vector(),
                    polygon.map(([x, y]) => new SAT.Vector(x, y))),
          action
        })
      )
    );
  }
}

export default Control;
