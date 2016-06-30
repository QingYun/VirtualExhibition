import THREE from 'three';
import { uv23d, imagePoint2UV, makeSprite, drawText } from '../util.js';

module.exports = function drawButton({ text, style, pos, action }, scene) {
  const canvas = drawText(text, style);
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  const sprite = makeSprite(texture);
  const { u, v } = imagePoint2UV(pos, scene.getDimensions());
  const { x, y, z } = uv23d(u, v, scene.getDimensions().radius);
  sprite.position.set(x, y, z);
  scene.drawObject(sprite);

  const { width: w, height: h } = canvas;
  const [hw, hh] = [w / 2, h / 2];
  const { x: cx, y: cy } = pos;
  return Promise.resolve({
    polygon: [[cx - hw, cy - hh], [cx + hw, cy - hh],
              [cx + hw, cy + hh], [cx - hw, cy + hh]],
    action
  });
};
