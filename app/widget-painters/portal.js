import THREE from 'three';
import { loadImage, loadTexture } from '../util.js';

const canvas = document.createElement('canvas');
// size may be changed to fit the current scene
canvas.width = 4096;
canvas.height = 2048;

function drawOnCanvas(ctx, arrow_img, arrow) {
  const { x, y, angle } = arrow.pos;
  const { width, height } = arrow_img;
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.drawImage(arrow_img, -width / 2, -height / 2, width, height);
  ctx.rotate(-angle);
  ctx.translate(-x, -y);
}

module.exports = function drawWidget(widget, scene) {
  const { width: scene_w, height: scene_h } = scene.getDimensions();
  if (canvas.width !== scene_w || canvas.height !== scene_h) {
    canvas.width = scene_w;
    canvas.height = scene_h;
  }

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  return loadImage(widget.src)
    .then((img) => {
      drawOnCanvas(ctx, img, widget);
      const material = new THREE.MeshBasicMaterial({
        map: loadTexture(canvas.toDataURL('image/png')),
        transparent: true
      });
      scene.drawOnShpere(material);

      const { x: cx, y: cy } = widget.pos;
      const [hh, hw] = [img.height / 2, img.width / 2];
      const [uy, ly, lx, rx] =
        [cy - hh, cy + hh, cx - hw, cx + hw];
      return {
        polygon: [[lx, uy], [rx, uy], [lx, ly], [rx, ly]],
        action: {
          name: 'change-scene',
          payload: {
            destination: widget.to
          }
        }
      };
    });
};
