import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { colors } from '../../services'
import { DivType } from '../../types'

export const useAlignCenterStyles = makeStyles({
  AlignCenter: {
    fontSize: 18,
    fontFamily: "Segoe UI",
    color: colors.text.small_text,
    fontWeight: 600,
    textAlign: "center",
  },
});

export const AlignCenter:DivType = (props) =>
  <div className={useAlignCenterStyles().AlignCenter} {...props}/>;
