import {useAppbarStyles} from "./useAppbarStyles";
import {useState} from "react";
import {sleep, useAsync} from "common-frontend-components";

const getToolbarClass = (classes: ReturnType<typeof useAppbarStyles>, isScrolledToTop: boolean, isScrollingUp: boolean):string =>
  [classes.toolBar, !isScrolledToTop && isScrollingUp ? classes.toolBarOnScroll : classes.toolBarOnTop].join(' ');

export const useToolbarClass = (classes: ReturnType<typeof useAppbarStyles>, isScrolledToTop: boolean, isScrollingUp: boolean):string => {
  const [toolBarClass, setToolBarClass] = useState<string>(getToolbarClass(classes, isScrolledToTop, isScrollingUp));

  useAsync(async () => {
    if (!isScrolledToTop)
      await sleep(100);

    setToolBarClass(getToolbarClass(classes, isScrolledToTop, isScrollingUp))
  }, [isScrolledToTop, isScrollingUp]);

  return toolBarClass;
}