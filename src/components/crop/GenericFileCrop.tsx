import React, {useState, Fragment, useRef, ReactNode, FC, ChangeEvent} from 'react'
import Slider from '@material-ui/core/Slider';
import Cropper from 'react-easy-crop'
// import { getOrientation } from 'get-orientation/browser'
import {NoRotateScaled} from './CropImage'
// import { getRotatedImage } from './rotateImage'
import {Button, makeStyles} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import LinearProgress from '@material-ui/core/LinearProgress'
import {Area} from "react-easy-crop/types";
import { BaseFunctionType } from '../../types'
import { alertService } from '../../services'
import { baseErrorPopup } from '../../popups'
// import type {ImageRedy} from "common-frontend-components";
// import {colors} from '../../../assets/styles/style_vars'
// import {BigRedButton} from "../CustomButtons/Buttons";

const cropCoverStyle = makeStyles({
  paper: {
    maxWidth:600,
    maxHeight: 'min(500px, calc(100% - 128px)) !important',
    width: '100%',
    height: '100%',
  },

  cropContainer: {
    width: '100%',
    height: '400px',
    position: 'relative',
  },

  controls: {
    margin: 'auto',
    width: '50%',
    display: 'flex',
    alignItems: 'center',
  },

  slider: {
    padding: '30px 0px',
  },

  button: {
    textAlign: 'center',
  },
});

// const ORIENTATION_TO_ANGLE = {
//   '3': 180,
//   '6': 90,
//   '8': -90,
// };

function readFile(file:Blob):Promise<string|ArrayBuffer|null> {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file)
  })
}

export type TimageSrc = null|string;

export interface IGenericFileCropRenderProps {
  selectFile: BaseFunctionType;
  imageSrc: TimageSrc;
}

export interface IonImageProps {
  url: string;
  file: Blob;
  imageSrc: TimageSrc;
}

export type TonImage = (props:IonImageProps) => void;

export interface IGenericFileCrop {
  render: (props:IGenericFileCropRenderProps) => ReactNode;
  onImage: TonImage;
  width?: number;
  height?: number;
  aspect?: number;
}

export const GenericFileCrop:FC<IGenericFileCrop> = ({render, onImage, width=1200, height=400, aspect=1}) => {
  const [openCropDialog, setOpenCropDialog] = useState(false);
  const [imageSrc, set_imageSrc] = useState<TimageSrc>(null);
  const [crop, set_crop] = useState({ x: 0, y: 0 });
  const [zoom, set_zoom] = useState(1);
  const [croppedAreaPixels, set_croppedAreaPixels] = useState<Area|null>(null);
  const [isCropping, set_isCropping] = useState(false);
  const [target, set_target] = useState<EventTarget & HTMLInputElement | null>(null);

  const inputEl = useRef<HTMLInputElement>(null);

  const selectFile = () => inputEl.current?.click();

  const onClose = () => {
    setOpenCropDialog(false);
    if (target && target.files) {
      target.value = '';
    }
  };

  const onZoomChange = (zoom:number) => set_zoom(zoom);
  const onCropChange = (crop:{ x: number, y: number }) => set_crop(crop);
  const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area):void => set_croppedAreaPixels(croppedAreaPixels);

  const showResult = async () => {
    set_isCropping(true);
    try {
      if (imageSrc && croppedAreaPixels) {
        const {file, url, imageCropped} = await NoRotateScaled(imageSrc, croppedAreaPixels, width, height);
        if (file) {
          const onImageParams:IonImageProps = {
            url,
            file,
            imageSrc,
          }

          if (typeof imageCropped === "string" && imageCropped) {
            onImageParams.imageSrc = imageCropped;
            set_imageSrc(imageCropped);
          }

          onImage(onImageParams);
        }
        else {
          console.error({
            GenericFileCropError: {
              showResultError: {
                message: "after calling NoRotateScaled function expected file:Blob but file is null",
              }
            }
          })
        }
      } else {
        console.error({
          GenericFileCropError: {
            showResultError: {
              message: imageSrc ? "" : "imageSrc can't be null"
                    + (!imageSrc && !croppedAreaPixels) ? " " : ""
                    + croppedAreaPixels ? "" : "croppedAreaPixels can't be null",
            }
          }
        })
      }
    }
    catch (e) {
      console.error(e);
    }
    set_isCropping(false);
    onClose();
  };

  const onFileChange = async (event:ChangeEvent<HTMLInputElement>) => {
    console.log({
      files: event.target.files?.length,
      size: event.target.files?.length ? event.target.files[0].size : false,
    })

    event.preventDefault();

    if (!event.target.files || event.target.files.length == 0) {
      console.info("onFileChange: file was not selected")
      return;
    }

    console.log("set_target(event.target)");
    set_target(event.target);

    const file = event.target.files[0];

    if (!file)
      return alertService.error(`file is "${file}"`);

    if (!file.size)
      return alertService.error(`file size is "${file.size}"`);

    console.log("max_size", 4096 * 4096);
    const max_size = 4096 * 4096; // blue ray
    if (file.size > max_size) {
      baseErrorPopup({
        title: 'File size too big',
        text: `Image ${file.size} exceeded the size limit of ${max_size/1000000}MB`,
      });
      return;
    }
    console.log("let imageDataUrl = await readFile(file)");
    const imageDataUrl = await readFile(file);

    console.log("const orientation = await getOrientation(file)");
    // apply rotation if needed
    // const orientation = await getOrientation(file);

    console.log(`
    const rotation = ORIENTATION_TO_ANGLE[orientation];
    `);
    // @ts-ignore
    // const rotation = ORIENTATION_TO_ANGLE[orientation];

    console.log(`
    if (rotation && imageDataUrl && typeof imageDataUrl === "string")
      imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      
       imageDataUrl ${imageDataUrl} typeof imageDataUrl ${imageDataUrl}
    `);
    // if (rotation && imageDataUrl && typeof imageDataUrl === "string")
    //   imageDataUrl = await getRotatedImage(imageDataUrl, rotation);

    setOpenCropDialog(typeof imageDataUrl === 'string');
    set_imageSrc(typeof imageDataUrl === 'string' ? imageDataUrl : null);
    set_crop({ x: 0, y: 0 });
    set_zoom(1);
    console.log(`
    finished
    `);
  };

  const classes = cropCoverStyle();

  return (
    <>
      {render({
        selectFile,
        imageSrc,
      })}
      {/*https://stackoverflow.com/questions/21523544/html-file-input-control-with-capture-and-accept-attributes-works-wrong*/}
      {/*https://stackoverflow.com/questions/64341977/using-device-camera-for-capturing-image-in-reactjs*/}
      <input
        accept="image/*"
        type="file"
        style={{display:'none'}}
        onChange={onFileChange}
        ref={inputEl}
      />
      <Dialog open={openCropDialog} PaperProps={{className: classes.paper}} >
        {imageSrc && (
          <Fragment>
            <div className={classes.cropContainer}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                cropShape="rect"
                showGrid={false}
                onCropChange={onCropChange}
                onCropComplete={onCropComplete}
                onZoomChange={onZoomChange}
              />
            </div>
            <div className={classes.controls}>
              <Slider
                color={'secondary'}
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(_e, zoom) => {
                  if (typeof zoom === 'number')
                    onZoomChange(zoom);
                  else
                    console.log({
                      GenericFileCropError: {
                        SliderError: {
                          type: "warning",
                          message: `onZoomChange call skipped because zoom value does not support type of ${typeof zoom}`,
                        }
                      }
                    })
                }}
                // classes={{ container: 'slider' }}
              />
            </div>
          </Fragment>
        )}
        <DialogActions>
          <Button disabled={isCropping} color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isCropping} color="secondary" autoFocus onClick={showResult}>
            Upload
          </Button>
        </DialogActions>
        {isCropping && <LinearProgress color='secondary'/>}
      </Dialog>
    </>
  )
}
