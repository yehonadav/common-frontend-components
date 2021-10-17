import React from "react";
import {FC} from "react";
import {useAppbarStyles} from "../useAppbarStyles";

export const AppbarPlaceholder: FC = () => {
  const classes = useAppbarStyles();
  return (
    <div className={classes.AppbarPlaceholder}/>
  )
}
