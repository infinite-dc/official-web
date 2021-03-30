import QRCode from 'qrcode';

function loadImageToCanvas(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.setAttribute('crossOrigin', 'Anonymous');
    img.src = url;
    img.onload = () => {
      const height = img.height;
      const width = img.width;
      const $c = document.createElement('canvas');
      $c.height = height;
      $c.width = width;
      const ctx = $c.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      resolve($c);
    };
  });
}

function loadImage(url) {
  return loadImageToCanvas(url).then(($c) => {
    const dataUrl = $c.toDataURL();
    return dataUrl;
  });
}

function getQrcode(text, option = { height: 150, width: 150, margin: 2 }) {
  return QRCode.toDataURL(text, option);
}

function spliceImages(images = [], width, height) {
  const $c = document.createElement('canvas');
  $c.height = height;
  $c.width = width;
  const ctx = $c.getContext('2d');
  const processed = images.map(img => ({
    ...img,
    canvas: null,
  }));
  return new Promise((resolve) => {
    const final = () => {
      for (let i = 0; i < processed.length; i += 1) {
        if (!processed[i].canvas) {
          return;
        }
      }
      for (let i = 0; i < processed.length; i += 1) {
        const image = processed[i];
        ctx.drawImage(image.canvas, image.x, image.y, image.width, image.height);
      }
      const dataUrl = $c.toDataURL();
      resolve(dataUrl);
    };
    processed.forEach((img, i) => {
      loadImageToCanvas(img.dataUrl).then((canvas) => {
        processed[i].canvas = canvas;
        final();
      });
    });
  });
}


export {
  loadImage,
  getQrcode,
  spliceImages,
};
