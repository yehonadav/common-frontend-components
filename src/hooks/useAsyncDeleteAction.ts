import {IAsyncButton} from "../interfaces";
import {Dispatch, SetStateAction, useState} from "react";
import {TuseAsyncActionResult} from "./useAsyncAction";
import {deleteWarningPopup, IdeletePopup} from "../popups/warnings/deleteWarningPopup";
import {setBackdrop} from "../services/backdrop/useStore";
import {deleteSuccessPopup} from "../popups/success/deleteSuccessPopup";

export type TuseAsyncDeleteAction = IAsyncButton & IdeletePopup;

export type TuseAsyncDeleteActionHandler = TuseAsyncDeleteAction & {
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
};

const asyncDeleteActionClick = ({onClick, isSubmitting, setIsSubmitting, ...options}:TuseAsyncDeleteActionHandler) => () => {
  if (isSubmitting)
    return;

  deleteWarningPopup(options)

    .then((result) => {

      if (result.isConfirmed) {

        setBackdrop(true);
        setIsSubmitting(true);

        onClick()
          .then(() => { deleteSuccessPopup(options) })

          .finally(() => {
            setBackdrop(false);
            setIsSubmitting(false);
          })
      }
    })
}

export const useAsyncDeleteAction = ({onClick, name, value}:TuseAsyncDeleteAction):TuseAsyncActionResult => {
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