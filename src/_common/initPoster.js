import { loadImage, getQrcode, spliceImages } from './imageUtils';

const $ = window.$;

export default function initPoster(inviteUrl) {
  const bg = $('#copyAPoster').attr('href');
  loadImage(bg).then((bgUrl) => {
    getQrcode(inviteUrl).then((qrcondeUrl) => {
      spliceImages([{
        dataUrl: bgUrl,
        x: 0,
        y: 0,
        width: 900,
        height: 1500,
      }, {
        dataUrl: qrcondeUrl,
        x: 708,
        y: 1324,
        width: 122,
        height: 122,
      }], 900, 1500).then((posterUrl) => {
        $('#copyAPoster').attr('href', posterUrl);
      });
    });
  });
}
