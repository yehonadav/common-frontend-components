import {Dispatch, SetStateAction, useState} from "react";
import {IAsyncButton} from "../interfaces";
import {BaseFunctionType} from "../types";

export type TuseAsyncActionResult = {
  handleClick: BaseFunctionType;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>
}

export const useAsyncAction = ({onClick}:IAsyncButton):TuseAsyncActionResult => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return {
    handleClick: () => {
      if (isSubmitting)
        return;

      setIsSubmitting(true);
      onClick().finally(()=>{
        setIsSubmitting(false);
      })
    },

    isSubmitting,
    setIsSubmitting,
  }
}