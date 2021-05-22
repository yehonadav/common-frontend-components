import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { DivType } from '../../types'

export const useRelativeStyles = makeStyles({
  Relative: {
    position: "relative",
  },
});

export const Relative:DivType = (props) =>
  <div className={useRelativeStyles().Relative} {...props}/>;
