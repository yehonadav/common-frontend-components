import {FC} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";

interface Props {
  size: number;
  fullWidth?: boolean
}

export const useSpacerStyles = makeStyles({
  Spacer: {
    margin: ({size}:Props)=>size/2,
    width: ({fullWidth}:Props)=>fullWidth ? '100%' : undefined,
  },
});

export interface ISpacer extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: number;
  component?: string;
  fullWidth?: boolean
}

export const Spacer:FC<ISpacer> = ({size=10, component='div', fullWidth=false, ...props}) => {
  const Component = component as keyof JSX.IntrinsicElements;
  // @ts-ignore
  return <Component className={useSpacerStyles({ size, fullWidth }).Spacer} {...props} />;
}
