import {Input} from "./Input";
import React, {FC, ReactNode} from "react";
import InputAdornment from '@material-ui/core/InputAdornment';
import { InputPropsType } from '../../types'

export interface IgetIconConfig {
  icon?:ReactNode;
  endIcon?:ReactNode;
  InputProps?:any;
}

export const getIconConfig = ({icon, endIcon, InputProps}:IgetIconConfig):any => {
  const res = InputProps || {};
  if (icon)
    res.startAdornment = (
      <InputAdornment position="start">
        {icon}
      </InputAdornment>
    );

  if (endIcon)
    res.endAdornment = (
      <InputAdornment position="end">
        {endIcon}
      </InputAdornment>
    );

  return res;
}

export const FormInput:FC<InputPropsType> = (
  {
    error,
    icon,
    endIcon,
    InputProps,
    ...props
}) => {
  return (
    <Input
      variant="standard"
      InputProps={getIconConfig({icon, endIcon, InputProps})}
      error={!!error}
      helperText={error}
      {...props}
    />
  )
};