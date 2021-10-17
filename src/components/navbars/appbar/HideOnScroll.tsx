import {FC} from "react";
import Slide from "@material-ui/core/Slide";
import {Scroll} from "common-frontend-components";

interface Props {
  scroller: Scroll;
  children: React.ReactElement;
}

export const HideOnScroll:FC<Props> = ({children, scroller}) => {
  const isScrolledToTop = scroller.useIsScrolledToTop();
  const isScrollingUp = scroller.useIsScrollingUp();
  const trigger = isScrolledToTop || isScrollingUp;
  return (
    <Slide appear={false} direction="down" in={trigger}>
      {children}
    </Slide>
  );
}
