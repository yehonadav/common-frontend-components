import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';
import React, {ReactElement} from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import { InputPropsType } from '../../types'

export const CustomTextArea = withStyles({
  root: {
    minWidth: 267,

    background: "#C2E6F2 0% 0% no-repeat padding-box",
    borderRadius: 23,
    font: "normal normal 600 18px/24px Segoe UI",
    color: "#504F59",
    padding: 10,

    "& label": {
      lineHeight: 0.7,
      font: "normal normal normal 18px/24px Segoe UI",
      letterSpacing: 0,
      color: "#504F5989",
    },

    "& fieldset": {
      border: "none",
    },

  },
})(TextField);


export const TextArea = ({rows=5, name, error, icon=null, ...props}: InputPropsType):ReactElement => {
  return (
    <CustomTextArea
      InputProps={icon ? {
        startAdornment: (
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        ),
      } : undefined}
      error={!!error}
      helperText={error}
      name={name}
      variant="outlined"
      multiline
      rows={rows}
      {...props}
    />
  )
};