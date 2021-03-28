import {useEffect, useMemo, useState} from "react";
import {useSpring} from "react-spring";

export interface IuseOpenSpringProps {
  open: boolean;
  initialStyle: object;
  openStyle: object;
  closeStyle: object;
}

export const emptyStyle = {from: {}};

export const useOpenSpring = (
  {
    open,
    initialStyle=emptyStyle,
    openStyle=emptyStyle,
    closeStyle=emptyStyle,
  }
  :IuseOpenSpringProps) =>
{
  const [style, set_style] = useState(initialStyle);
  const animaStyle = useSpring(style);

  // open and close
  useEffect(()=>{
    set_style(open ? openStyle : closeStyle)
  }, [open]);

  return useMemo(()=>({
    style,
    set_style,
    animaStyle,
  }), [style, animaStyle]);
};