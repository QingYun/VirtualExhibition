import { createElm } from '../../util.js';

module.exports = ({ subtype = '', src, caption, description }) => {
  const slide = createElm('li', {
    class: `image-slide yue ${subtype}`
  });
  slide.appendChild(createElm('img', { src }));

  if ((caption || description) !== undefined) {
    const bottom_bar = createElm('div', { class: 'bottom-bar' });

    if (caption !== undefined) {
      bottom_bar.appendChild(createElm('h3', {}, caption));
    }

    if (description !== undefined) {
      bottom_bar.appendChild(createElm('p', {}, description));
    }

    slide.appendChild(bottom_bar);
  }

  return slide;
};
