import React from "react";
import {withStyles} from "@material-ui/core";
import ChipBtn from '@material-ui/core/Chip';
import CancelIcon from "@material-ui/icons/CancelOutlined";
import { do_nothing_function } from '../../utils'
import { boxShadows } from '../../services'

export const CustomChip = withStyles({
  root: {
    background: "#C2E6F2 0% 0% no-repeat padding-box",
    borderRadius: 25,

    fontFamily: "Segoe UI",
    fontSize: 16,
    color: "#303B4B",
    fontWeight: 400,
    textTransform: 'none',

    padding: "23px 5px",

    '&:hover, &:active, &:focus': {
      backgroundColor: "#aed9fb",

      boxShadow: boxShadows.boxShadowCustomChip,
    },
  },
})(ChipBtn);


export const Chip = ({label="", handleClick=do_nothing_function, handleDelete=do_nothing_function, deleteIcon: DeleteIcon=CancelIcon, ...props}) => {
  return <CustomChip label={label} onClick={handleClick} onDelete={handleDelete} deleteIcon={<DeleteIcon color={'inherit'} style={{color: '#303B4B'}}/>}{...props}/>
};
