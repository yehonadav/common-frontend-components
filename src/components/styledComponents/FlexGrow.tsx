import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { DivType } from '../../types'

export const useFlexGrowStyles = makeStyles({
  FlexGrow: {
    flexGrow: 1,
  },
});

export const FlexGrow:DivType = (props) =>
  <div className={useFlexGrowStyles().FlexGrow} {...props}/>;
