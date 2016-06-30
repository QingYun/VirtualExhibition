import THREE from 'three';
import { loadTexture } from './util.js';

function makeSphere(width, radius, sphere) {
  const new_radius = width / Math.PI / 2;
  if (new_radius !== radius || sphere === undefined) {
    const new_sphere = new THREE.SphereGeometry(new_radius, 100, 100);
    new_sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
    return [new_radius, new_sphere];
  }
  return [radius, sphere];
}

class Scene extends THREE.EventDispatcher {
  constructor(widget_painters) {
    super();
    this.scene = new THREE.Scene();

    // 4096: estimated width
    [this.radius, this.sphere] = makeSphere(4096, this.radius, this.sphere);
    this.sphere_material = new THREE.MeshBasicMaterial();
    this.sphere_mesh = new THREE.Mesh(this.sphere, this.sphere_material);
    this.scene.add(this.sphere_mesh);

    this.widget_painters = widget_painters;
    this.widgets = [];
  }

  changeScene(data) {
    [this.radius, this.sphere] =
      makeSphere(data.width, this.radius, this.sphere);
    this.dimensions =
      { width: data.width, height: data.height, radius: this.radius };

    this.sphere_material.map = loadTexture(data.src);
    this.widgets.forEach((w) => this.scene.remove(w));
    this.widgets = [];
    this.dispatchEvent({ type: 'new scene' });
    this.addWidgets(data.widgets);
  }

  drawOnShpere(material) {
    const widget = new THREE.Mesh(this.sphere, material);
    this.widgets.push(widget);
    this.scene.add(widget);
  }

  drawObject(mesh) {
    this.widgets.push(mesh);
    this.scene.add(mesh);
  }

  addWidgets(widgets) {
    const future_clickables = widgets
      .map((w) => this.widget_painters[w.type](w, this));
    this.dispatchEvent({ type: 'new clickables', future_clickables });
  }

  getScene() { return this.scene; }
  getDimensions() { return this.dimensions; }
  getSphereMesh() { return this.sphere_mesh; }
}

export default Scene;
