import React, {ReactElement} from "react";
import { useLoadDot } from '../../hooks'

export interface ILoadDots  {
  loading?: boolean;
  style?: Record<string, any>;
  [x:string]: any;
}

export const LoadDots = ({loading=true, style={}, ...props}:ILoadDots):ReactElement|null => {
  const load_msg = useLoadDot(loading);
  return loading
    ? <span style={{position:"relative", ...style}} {...props}><span style={{position:"absolute"}}>{load_msg}</span></span>
    : null
};