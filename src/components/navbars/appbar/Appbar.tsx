import { FC, ReactNode } from 'react'
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
import { AppBarProps } from '@material-ui/core/AppBar/AppBar'
import { ToolbarProps } from '@material-ui/core/Toolbar/Toolbar'

export type AppbarProps = {
  component:FC<{color:PropTypes.Color; isScrollingUp:boolean; isScrolledToTop:boolean; toolBarClass:string, appbarClass:string}>;
  appBarProps?:AppBarProps;
  toolbarProps?:ToolbarProps;
  placeHolder?:ReactNode;
}

export const Appbar:FC<AppbarProps> = (
  {
    component:Component,
    appBarProps={},
    toolbarProps={},
    placeHolder=<AppbarPlaceholder/>
  }) => {
  const classes = useAppbarStyles();
  const isScrollingUp = bodyScroll.useIsScrollingUp();
  const isScrolledToTop = bodyScroll.useIsScrolledToTop();
  const color = useColor(isScrolledToTop);
  const toolBarClass = useToolbarClass(classes, isScrolledToTop, isScrollingUp);

  return (
    <>
      <HideOnScroll scroller={bodyScroll}>
        <AppBar className={classes.appbar} {...appBarProps}>
          <Toolbar className={toolBarClass} {...toolbarProps}>
            <Component
              color={color}
              isScrolledToTop={isScrolledToTop}
              isScrollingUp={isScrollingUp}
              toolBarClass={toolBarClass}
              appbarClass={classes.appbar}
            />
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {placeHolder}
    </>
  )
}
