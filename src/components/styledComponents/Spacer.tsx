import {FC} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";

export const useSpacerStyles = makeStyles({
  Spacer: {
    margin: ({size}:{size:number})=>size/2,
  },
});

export interface ISpacer extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: number
}

export const Spacer:FC<ISpacer> = ({size=10, ...props}) =>
  <div className={useSpacerStyles({size}).Spacer} {...props}/>;
