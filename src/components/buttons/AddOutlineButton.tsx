import React, {FC} from "react";
import {ButtonProps} from "@material-ui/core/Button";
import {OutlinedPrimaryButton} from "./Buttons";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';

export const AddOutlinedButton:FC<ButtonProps> = (props) => {
  return (
    <OutlinedPrimaryButton
      // @ts-ignore
      startIcon={
        <IconButton size={"small"}>
          <AddIcon/>
        </IconButton>
      }
      {...props}
    />
  )
};
