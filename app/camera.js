import THREE from 'three';

class Camera {
  constructor() {
    // camera.aspect will be updated to window's aspect inside resize()
    this.camera = new THREE.PerspectiveCamera(75, 0.5, 1, 1000);
    this.reset();

    const resizeCamera = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', resizeCamera);
    resizeCamera();
  }

  reset() {
    this.camera.position.z = 0.01;
  }

  getCamera() {
    return this.camera;
  }
}

export default Camera;
