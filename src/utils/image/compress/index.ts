import { drawImageInCanvas, getDataUrlFromFile, getFilefromDataUrl, loadImage } from '@utils/image';

// eslint-disable-next-line default-param-last
async function imageCompression(file: File, maxSizeMB = Number.POSITIVE_INFINITY, maxWidthOrHeight?: number) {
  if (!/^image/.test(file.type)) {
    throw new Error('The file given is not an image')
  }

  const maxSizeByte = maxSizeMB * 1024 * 1024
  const dataUrl = await getDataUrlFromFile(file)
  const img = await loadImage(dataUrl)
  const canvas = drawImageInCanvas(img, maxWidthOrHeight)
  let quality = 0.9
  let compressedFile = await getFilefromDataUrl(canvas.toDataURL(file.type, quality), file.name, file.lastModified)

  if (file && img) {
    while (compressedFile.size > maxSizeByte) {
      canvas.width *= 0.9
      canvas.height *= 0.9

      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)

      const compressedDataUrl = canvas.toDataURL(file.type, quality)
      // eslint-disable-next-line no-await-in-loop
      compressedFile = await getFilefromDataUrl(compressedDataUrl, file.name, file.lastModified)
    }
  } else {
    while (compressedFile.size > maxSizeByte) {
      quality *= 0.9
      const compressedDataUrl = canvas.toDataURL(file.type, quality)
      // eslint-disable-next-line no-await-in-loop
      compressedFile = await getFilefromDataUrl(compressedDataUrl, file.name, file.lastModified)
    }
  }

  return compressedFile
}

imageCompression.drawImageInCanvas = drawImageInCanvas
imageCompression.getDataUrlFromFile = getDataUrlFromFile
imageCompression.getFilefromDataUrl = getFilefromDataUrl
imageCompression.loadImage = loadImage

export default imageCompression
