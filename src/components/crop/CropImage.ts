import {Area} from "react-easy-crop/types";

export type CropResponse = {url: string; file: Blob|null; imageCropped: string|null|ArrayBuffer}

export type TCroppingPromise = Promise<CropResponse>;

export const CroppingPromise = (canvas:HTMLCanvasElement)
  :TCroppingPromise =>
{
  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise(resolve => {
    canvas.toBlob(file => {
      const reader = new FileReader();

      reader.onload = function() {
        resolve({
          file,
          url: URL.createObjectURL(file),
          imageCropped: reader.result,
        })
      };

      if (file)
        reader.readAsDataURL(file);

      else
        resolve({file: null, url: "", imageCropped: ""});

    }, 'image/jpeg')
  })
}

export const getCropContext = (canvas:HTMLCanvasElement)
  :CanvasRenderingContext2D =>
{
  const ctx = canvas.getContext('2d');

  if (!ctx)
    throw Error("CropImageError: canvas.getContext('2d') returned 'null', expected CanvasRenderingContext2D object")

  return ctx
}

export const createImage = (url:string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', error => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  });

function getRadianAngle(degreeValue:number):number {
  return (degreeValue * Math.PI) / 180
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} imageSrc - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
export default async (imageSrc:string, pixelCrop:Area, rotation = 0)
  :Promise<TCroppingPromise> =>
{
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = getCropContext(canvas);

  const safeArea = Math.max(image.width, image.height) * 2;

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  // draw rotated image and store data.
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
    0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
  );

  return CroppingPromise(canvas);
}


export const NoRotate = async (imageSrc:string, pixelCrop:Area)
  :Promise<TCroppingPromise> =>
{
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = getCropContext(canvas);

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  ctx.drawImage(image, -pixelCrop.x, -pixelCrop.y)

  return CroppingPromise(canvas);
}

export const NoRotateScaled = async (imageSrc:string, pixelCrop:Area, maxWidth:number, maxHeight:number)
  :Promise<TCroppingPromise> =>
{
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = getCropContext(canvas);

  const new_width = Math.min(pixelCrop.width, maxWidth)
  const new_height = Math.min(pixelCrop.height, maxHeight)
  const scale = Math.min(new_width/pixelCrop.width, new_height/pixelCrop.height)

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width*scale
  canvas.height = pixelCrop.height*scale

  ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width*scale, pixelCrop.height*scale)

  return CroppingPromise(canvas);
}