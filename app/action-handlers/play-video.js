import picoModal from '../vender/picoModal.js';
import { elm2Str } from '../util.js';

module.exports = () => ({ sources }) => {
  const video = document.createElement('video');
  video.setAttribute('width', window.innerWidth * 0.8);
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
