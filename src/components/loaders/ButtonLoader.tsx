import React, {ReactElement, ReactNode} from "react";
import CircularProgress, {CircularProgressProps} from "@material-ui/core/CircularProgress/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {LoadDots} from "./LoadDots";
import { NullableBoolean } from '../../types'

export const useBtnLoadStyles = makeStyles({
  spacer: {
    width: 10,
  },
});

const defaultProps = {};
const defaultSize = 14;
const defaultLoadText = "Please wait";

export interface IBtnLoad  {
  loading?: NullableBoolean;
  text: ReactNode;
  size?: number;
  loadText?: ReactNode;
  CircularProgressProps?: CircularProgressProps;
  spacerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
  loadTextProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
}

export const BtnLoad = ({
  loading,
  text,
  size=defaultSize,
  CircularProgressProps=defaultProps,
  spacerProps=defaultProps,
  loadText=defaultLoadText,
  loadTextProps=defaultProps
}:IBtnLoad):ReactElement => {
  const classes = useBtnLoadStyles();
  return (
    loading
      ? <>
        <CircularProgress size={size} color={'inherit'} {...CircularProgressProps}/>
        <span className={classes.spacer} {...spacerProps}/>
        <span {...loadTextProps}>{loadText}<LoadDots loading={loading} style={{width:30}}/></span>
        <span style={{width:15}}/>
      </>
      : <>{text}</>
  )
};