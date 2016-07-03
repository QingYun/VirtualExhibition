import picoModal from '../vender/picoModal.js';
import { elm2Str } from '../util.js';

module.exports = () => ({ url }) => {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('width', window.innerWidth * 0.8);
  iframe.setAttribute('height', window.innerHeight * 0.8);
  iframe.setAttribute('src', url);

  picoModal({ content: elm2Str(iframe), closeButton: false }).show();
};
