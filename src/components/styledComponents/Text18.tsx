import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { DivType } from '../../types'

export const useText18Styles = makeStyles({
  Text18: {
    fontSize: 18,
    fontFamily: "Segoe UI",
    color: "#303B4B",
  },
});

export const Text18:DivType = ({...props}) =>
  <div className={useText18Styles().Text18} {...props}/>;
