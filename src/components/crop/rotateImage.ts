import {createImage, getCropContext} from "./CropImage";

export async function getRotatedImage(imageSrc:string, rotation = 0)
  :Promise<Promise<string>>
{
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = getCropContext(canvas);

  const orientationChanged =
    rotation === 90 || rotation === -90 || rotation === 270 || rotation === -270;
  if (orientationChanged) {
    canvas.width = image.height;
    canvas.height = image.width;
  } else {
    canvas.width = image.width;
    canvas.height = image.height
  }

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.drawImage(image, -image.width / 2, -image.height / 2);

  return new Promise(resolve => {
    canvas.toBlob(file => {
      resolve(URL.createObjectURL(file))
    }, 'image/jpeg')
  })
}