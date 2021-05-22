import React, {FC, ReactNode} from "react";
import {ButtonProps} from "@material-ui/core/Button";
import { useAsyncAction } from '../../hooks'
import { BtnLoad } from '../loaders'
import { IAsyncButton } from '../../interfaces'

export interface IAsyncButtonProps extends IAsyncButton {
  Button: FC<ButtonProps>;
  text: ReactNode;
  loadText: ReactNode;
  [x:string]: any;
}

export const AsyncButton
  :FC<IAsyncButtonProps> = (
    {
      onClick,
      Button,
      text,
      loadText,
      ...props
    }) =>
{
  const {handleClick, isSubmitting} = useAsyncAction({onClick})

  return (
    <Button onClick={handleClick} {...props}>
      <BtnLoad loading={isSubmitting} text={text} loadText={loadText}/>
    </Button>
  )
}