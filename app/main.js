require('./styles/main.scss');

import path from 'path';
import Stats from 'stats-js';
import getDataSource from './data-source.js';
import Renderer from './renderer.js';
import Scene from './scene.js';
import Camera from './camera.js';
import Control from './control.js';

const requireWidgetPainters = (req) => req
  .keys()
  .map((file) => [path.basename(file, '.js'), req(file)])
  .reduce((acc, [name, handler]) =>
    Object.assign(acc, { [name]: handler })
  , {})
;
const widget_painters = requireWidgetPainters(
  require.context('./widget-painters', false, /\.js$/));

const data_source = getDataSource();

const scene = new Scene(widget_painters);

data_source.addEventListener('new scene', (data) =>
  scene.changeScene(data)
);

const camera = new Camera();

scene.addEventListener('new scene', () =>
  camera.reset()
);

const renderer = new Renderer();

const control = new Control({
  listenDOM: renderer.getDOM(),
  camera,
  scene,
});

renderer.addEventListener('animate', () =>
  control.updateCamera()
);
scene.addEventListener('new scene', () =>
  control.reset()
);
scene.addEventListener('new clickables', ({ future_clickables }) =>
  control.addClickables(future_clickables)
);

const context = { renderer, scene, camera, control, data_source };
const requireActionHandlers = (req) => req
  .keys()
  .map((file) => [path.basename(file, '.js'), req(file)(context)])
  .reduce((acc, [name, handler]) =>
    Object.assign(acc, { [name]: handler })
  , {})
;
const action_handlers = requireActionHandlers(
  require.context('./action-handlers', false, /\.js$/));
control.addEventListener('action', ({ name, payload }) =>
  action_handlers[name](payload)
);

document.body.appendChild(renderer.getDOM());
renderer.start({
  scene: scene.getScene(),
  camera: camera.getCamera()
});

if (__DEV__) {
  const stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.zIndex = 100;
  document.body.appendChild(stats.domElement);
  renderer.addEventListener('animate', () => stats.update());
}

// load default scene
data_source.loadScene();
