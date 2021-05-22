import {Input} from "./Input";
import React, {ReactElement, useState} from "react";
import LockIcon from '@material-ui/icons/Lock';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { InputPropsType } from '../../types'

export const PasswordInput = ({error, ...props}: InputPropsType):ReactElement => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Input
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      error={!!error}
      //@ts-ignore
      helperText={error}
      label="Password"
      placeholder="examplePassword123!@#"
      name="password"
      type={showPassword ? 'text' : 'password'}
      {...props}
    />
  )
};