import THREE from 'three';

const img_loader = new THREE.ImageLoader();

export function loadImage(src) {
  return new Promise((resolve, reject) =>
    img_loader.load(src, resolve, undefined, reject)
  );
}

export function loadTexture(src) {
  const texture = new THREE.Texture();
  loadImage(src).then((img) => {
    texture.image = img;
    texture.needsUpdate = true;
  });
  return texture;
}

export function loadTextureAsync(src) {
  return loadImage(src).then((img) => {
    const texture = new THREE.Texture();
    texture.image = img;
    texture.needsUpdate = true;
    return texture;
  });
}

export function uv23d(u, v, radius) {
  const theta = 2 * Math.PI * u;
  const phi = Math.PI * v;

  return {
    x: Math.cos(theta) * Math.sin(phi) * radius,
    y: -Math.cos(phi) * radius,
    z: Math.sin(theta) * Math.sin(phi) * radius,
  };
}

export function imagePoint2UV({ x, y }, { width, height }) {
  return {
    u: x / width,
    v: - (y / height) + 1
  };
}

export function makeSprite(texture, size) {
  const sprite_material = new THREE.SpriteMaterial({
    map: texture,
    depthWrite: false,
    depthTest: false,
    useScreenCoordinates: false
  });
  const sprite = new THREE.Sprite(sprite_material);
  const { width, height } = size || texture.image;
  sprite.scale.set(width, height, 1);
  return sprite;
}

function colorObj2Str({ r, g, b, a = 1 }) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function drawRoundRect(ctx,
  { border_radius, border_weight, content_width, content_height }) {
  const half_border = border_weight / 2;
  // top left
  const [tlx, tly] = [half_border, half_border];
  // bottom right
  const [brx, bry] = [
    border_weight + content_width + half_border,
    border_weight + content_height + half_border
  ];

  ctx.beginPath();
  ctx.moveTo(tlx + border_radius, tly);
  ctx.lineTo(brx - border_radius, tly);
  ctx.quadraticCurveTo(brx, tly, brx, tly + border_radius);
  ctx.lineTo(brx, bry - border_radius);
  ctx.quadraticCurveTo(brx, bry, brx - border_radius, bry);
  ctx.lineTo(tlx + border_radius, bry);
  ctx.quadraticCurveTo(tlx, bry, tlx, bry - border_radius);
  ctx.lineTo(tlx, tly + border_radius);
  ctx.quadraticCurveTo(tlx, tly, tlx + border_radius, tly);
  ctx.closePath();
}

const text_canvas = document.createElement('canvas');
export function drawText(text, options = {}) {
  const { font_style, font_variant, font_weight, font_stretch } = options;
  const { font_size = 18, font_family = 'Arial',
          border_weight = 4, border_radius = 6,
          backgroud_color = { r: 255, g: 255, b: 255, a: 1 },
          text_color = { r: 0, g: 0, b: 0, a: 1 },
          text_padding = { left: 0, right: 0, bottom: 0, top: 0 } } = options;
  const font_decoration =
    font_style || font_variant || font_weight || font_stretch || '';
  const font =
    `${font_decoration} ${font_size}px / ${font_size}px ${font_family}`;
  const border_color =
    border_weight === 0 ? { r: 0, b: 0, g: 0, a: 0 } : options.border_color;

  let ctx = text_canvas.getContext('2d');
  ctx.font = font;
  const { width: text_width } = ctx.measureText(text);
  const content_width = text_width + text_padding.left + text_padding.right;
  const content_height = font_size + text_padding.top + text_padding.bottom;

  text_canvas.width = content_width + border_weight * 2;
  text_canvas.height = content_height + border_weight * 2;
  ctx = text_canvas.getContext('2d');
  ctx.font = font;

  ctx.fillStyle = colorObj2Str(backgroud_color);
  ctx.strokeStyle = colorObj2Str(border_color);
  ctx.lineWidth = border_weight;
  drawRoundRect(ctx,
    { border_radius, border_weight, content_width, content_height });
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = colorObj2Str(text_color);
  ctx.textBaseline = 'top';
  ctx.fillText(text, border_weight + text_padding.left,
                     border_weight + text_padding.top);

  return text_canvas;
}

export function elm2Str(elm) {
  const temp_parent = document.createElement('div');
  temp_parent.appendChild(elm);
  return temp_parent.innerHTML;
}

export function createElm(tag, attrs = {}, content) {
  const elm = document.createElement(tag);

  Object.keys(attrs).forEach((k) => {
    if (typeof attrs[k] !== 'boolean' || attrs[k] === true) {
      elm.setAttribute(k, attrs[k]);
    }
  });

  if (content !== undefined) {
    elm.innerText = content;
  }

  return elm;
}
