import { createElm } from '../../util.js';

module.exports = ({ subtype = '', header, subheader, paragraphs }) => {
  const slide = createElm('li', {
    class: `text-slide yue ${subtype}`
  });

  if (header !== undefined) {
    slide.appendChild(createElm('h1', {}, header));
  }

  if (subheader !== undefined) {
    slide.appendChild(createElm('h2', {}, subheader));
  }

  paragraphs.forEach((p) =>
    slide.appendChild(createElm('p', {}, p))
  );

  return slide;
};
