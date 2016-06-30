import THREE from 'three';

class Renderer extends THREE.EventDispatcher {
  constructor() {
    super();
    this.renderer = new THREE.WebGLRenderer();

    const resize = () =>
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    resize();
    window.addEventListener('resize', resize);
  }

  getDOM() {
    return this.renderer.domElement;
  }

  start({ scene, camera }) {
    this.addEventListener('animate', () =>
      this.renderer.render(scene, camera)
    );

    const render = () => {
      requestAnimationFrame(render);
      this.dispatchEvent({ type: 'animate' });
    };
    requestAnimationFrame(render);
  }
}

export default Renderer;
