import path from 'path';
import picoModal from '../vender/picoModal.js';
import { elm2Str, createElm, toPxSize } from '../util.js';

const requireSlideGenerators = (req) => req
  .keys()
  .map((file) => [path.basename(file, '.js'), req(file)])
  .reduce((acc, [name, handler]) =>
    Object.assign(acc, { [name]: handler })
  , {})
;
const slide_generators = requireSlideGenerators(
  require.context('./slide-generators', false, /\.js$/));

module.exports = () => ({ slides, size }) => {
  const slider = createElm('div', { class: 'csslider' });

  [,...Array(slides.length)].forEach((_, i) =>
    slider.appendChild(createElm('input', {
      type: 'radio',
      name: 'slides',
      id: `slide${i}`,
      checked: i === 1
    }))
  );

  const slide_list = createElm('ul');
  slides
    .map(({ type, content }) => slide_generators[type](content))
    .forEach((slide) => slide_list.appendChild(slide));
  slider.appendChild(slide_list);

  const arrows = createElm('div', { class: 'arrows' });
  [,...Array(slides.length)].forEach((_, i) =>
    arrows.appendChild(createElm('label', {
      for: `slide${i}`
    }))
  );
  [[1, 'goto-first'], [slides.length, 'goto-last']].forEach(([i, c]) =>
    arrows.appendChild(createElm('label', {
      for: `slide${i}`,
      class: c
    }))
  );
  slider.appendChild(arrows);

  const navigation_container = createElm('div', { class: 'navigation' });
  const navigation = createElm('div');
  [,...Array(slides.length)].forEach((_, i) =>
    navigation.appendChild(createElm('label', { for: `slide${i}` }))
  );
  navigation_container.appendChild(navigation);
  slider.appendChild(navigation_container);

  const { width, height } = toPxSize(size);
  slider.setAttribute('style', `width: ${width}; height: ${height};`);

  picoModal({
    content: elm2Str(slider),
    closeButton: false,
    modalClass: 'slider-modal'
  }).show();
};
