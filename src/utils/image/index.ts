export function getDataUrlFromFile(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(String(reader.result));
    };
    reader.onerror = reject;
  });
}

export function getDataArrayBuffer(file: Blob): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(Buffer.from(reader.result));
      }
    }
    reader.onerror = reject;
  })
}

export function getFilefromDataUrl(dataurl: string, filename: string, lastModified = Date.now()): Promise<File | Blob> {
  return new Promise((resolve) => {
    const arr = dataurl.split(',');
    const mime = arr?.[0]?.match(/:(.*?)/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n) {
      u8arr[n] = bstr.charCodeAt(n);
      n -= 1;
    }
    let file;
    try {
      file = new File([u8arr], filename, { type: mime }); // Edge do not support File constructor
    } catch (e) {
      file = new Blob([u8arr], { type: mime });
    }
    resolve(file);
  });
}

export function loadImage(src: string): Promise<CanvasImageSource> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = reject;
    img.src = src;
  });
}

export function drawImageInCanvas(img: any, maxWidthOrHeight = -1) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (Number.isInteger(maxWidthOrHeight) && maxWidthOrHeight && (img.width > maxWidthOrHeight || img.height > maxWidthOrHeight)) {
    if (img.width > img.height) {
      canvas.width = maxWidthOrHeight;
      canvas.height = (img.height / img.width) * maxWidthOrHeight;
    } else {
      canvas.width = (img.width / img.height) * maxWidthOrHeight;
      canvas.height = maxWidthOrHeight;
    }
  } else {
    canvas.width = img.width;
    canvas.height = img.height;
  }
  ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas;
}
