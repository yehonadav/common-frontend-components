import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { DivType } from '../../types'

export const useText12LightStyles = makeStyles({
  Text12Light: {
    fontSize: 12,
    fontFamily: "Segoe UI",
    color: "rgba(80, 79, 89, 0.54)",
  },
});

export const Text12Light:DivType = (props) =>
  <div className={useText12LightStyles().Text12Light} {...props}/>;
