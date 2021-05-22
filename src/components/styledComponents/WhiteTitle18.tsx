import {FC} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { colors } from '../../services'

export const useWhiteTitle18Styles = makeStyles({
  WhiteTitle18: {
    fontSize: 18,
    fontFamily: "Segoe UI",
    color: colors.text.title,
    fontWeight: 600,
  },
});

export const WhiteTitle18:FC = (props) =>
  <div className={useWhiteTitle18Styles().WhiteTitle18} {...props}/>;
