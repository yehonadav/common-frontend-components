import {Input} from "./Input";
import React, {FC} from "react";
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import { InputPropsType } from '../../types'

export const EmailInput:FC<InputPropsType> = ({error, ...props}) => {
  return (
    <Input
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <EmailIcon />
          </InputAdornment>
        ),
      }}
      error={!!error}
      helperText={error}
      placeholder="example@email.com"
      label="Email"
      name="email"
      type="email"
      {...props}
    />
  )
};