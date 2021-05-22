import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { DivType } from '../../types'

export const useText18Styles = makeStyles({
  Text21: {
    fontSize: 21,
    fontFamily: "Segoe UI",
    color: "#D4E5FF",
  },
});

export const Text21:DivType = ({...props}) =>
  <div className={useText18Styles().Text21} {...props}/>;
