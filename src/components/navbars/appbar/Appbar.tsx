import { FC } from 'react'
import {useAppbarStyles} from "./useAppbarStyles";
import {AppbarPlaceholder} from "./components/AppbarPlaceholder";
import {HideOnScroll} from "./HideOnScroll";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {useToolbarClass} from "./useToolbarClass";
import {useColor} from "./useColor";
import { bodyScroll } from '../../../services/scroll/Scroll';
import { PropTypes } from '@material-ui/core'
import React from 'react';

export const Appbar:FC<{component:FC<{color:PropTypes.Color}>}> = ({component:Component}) => {
  const classes = useAppbarStyles();
  const isScrollingUp = bodyScroll.useIsScrollingUp();
  const isScrolledToTop = bodyScroll.useIsScrolledToTop();
  const color = useColor(isScrolledToTop);
  const toolBarClass = useToolbarClass(classes, isScrolledToTop, isScrollingUp);

  return (
    <>
      <HideOnScroll scroller={bodyScroll}>
        <AppBar className={classes.appbar}>
          <Toolbar className={toolBarClass}>
            <Component color={color}/>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <AppbarPlaceholder/>
    </>
  )
}
