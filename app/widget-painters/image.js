import { uv23d, imagePoint2UV, loadTextureAsync, makeSprite } from '../util.js';

module.exports = function drawImage({ src, size, pos, action }, scene) {
  return loadTextureAsync(src)
    .then((texture) => makeSprite(texture, size))
    .then((sprite) => {
      const { u, v } = imagePoint2UV(pos, scene.getDimensions());
      const { x, y, z } = uv23d(u, v, scene.getDimensions().radius);
      sprite.position.set(x, y, z);
      scene.drawObject(sprite);

      const { width: w, height: h } = size || sprite.material.map.image;
      const [hw, hh] = [w / 2, h / 2];
      const { x: cx, y: cy } = pos;
      return {
        polygon: [[cx - hw, cy - hh], [cx + hw, cy - hh],
                  [cx + hw, cy + hh], [cx - hw, cy + hh]],
        action
      };
    });
};
