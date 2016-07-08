import picoModal from '../vender/picoModal.js';
import { elm2Str, toPxSize } from '../util.js';

module.exports = () => ({ sources, size }) => {
  const video = document.createElement('video');
  const { width, height } = toPxSize(size);
  video.setAttribute('width', width);
  video.setAttribute('height', height);
  video.setAttribute('controls', true);
  sources.forEach(({ src, type }) => {
    const source = document.createElement('source');
    source.src = src;
    source.type = type;
    video.appendChild(source);
  });

  picoModal({ content: elm2Str(video), closeButton: false })
    .afterClose((modal) =>
      modal.modalElem().querySelector('video').pause())
    .show();
};
