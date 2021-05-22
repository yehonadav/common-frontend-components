import {RoundWarningButton} from "./Buttons";
import React, {FC} from "react";
import {ButtonProps} from "@material-ui/core/Button";
import { IAsyncButton } from '../../interfaces'
import { useAsyncDeleteAction } from '../../hooks'
import { BtnLoad } from '../loaders'

export interface IDeleteButton extends IAsyncButton {
  ButtonProps?: ButtonProps;
  name: string;
  value: string;
}

export const DeleteButton:FC<IDeleteButton> = ({onClick, name, value, ButtonProps={}}) => {
  const {handleClick, isSubmitting} = useAsyncDeleteAction({onClick, name, value})

  return (
    <RoundWarningButton onClick={handleClick} {...ButtonProps}>
      <BtnLoad loading={isSubmitting} text={"Delete"} loadText={"Deleting"}/>
    </RoundWarningButton>
  )
}