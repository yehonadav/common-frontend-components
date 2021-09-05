import {IAsyncButton} from "../interfaces";
import {Dispatch, SetStateAction, useState} from "react";
import {TuseAsyncActionResult} from "./useAsyncAction";
import {deleteWarningPopup, IDeletePopup} from '../popups';
import {setBackdrop} from "../services/backdrop/useStore";
import {deleteSuccessPopup} from '../popups';

export type UseAsyncDeleteAction = IAsyncButton & IDeletePopup;

export type UseAsyncDeleteActionHandler = UseAsyncDeleteAction & {
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  warningPopupOptions?: Partial<IDeletePopup>;
  successPopupOptions?: Partial<IDeletePopup>;
};

const asyncDeleteActionClick = (
  {
    onClick,
    isSubmitting,
    setIsSubmitting,
    warningPopupOptions={},
    successPopupOptions={},
    name,
    value,
  }:UseAsyncDeleteActionHandler) => () =>
{
  warningPopupOptions.name = name;
  warningPopupOptions.value = value;
  successPopupOptions.name = name;
  successPopupOptions.value = value;

  if (isSubmitting)
    return;

  deleteWarningPopup(warningPopupOptions as IDeletePopup)
    .then((result) => {
      if (result.isConfirmed) {
        setBackdrop(true);
        setIsSubmitting(true);

        onClick()
          .then(() => { deleteSuccessPopup(successPopupOptions as IDeletePopup) })
          .finally(() => {
            setBackdrop(false);
            setIsSubmitting(false);
          })
      }
    })
}

export const useAsyncDeleteAction = ({onClick, name, value}:UseAsyncDeleteAction):TuseAsyncActionResult => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = asyncDeleteActionClick({
    onClick,
    isSubmitting,
    setIsSubmitting,
    name,
    value,
  });

  return {
    handleClick,
    isSubmitting,
    setIsSubmitting,
  }
}