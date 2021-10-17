import React from "react";
import {FC} from "react";
import { useWidth } from '../../../../stores/usePageStore'

export const AppbarEdge:FC = () => {
  const width = useWidth();

  if (width <= 1200)
    return null;

  return (
    <div style={{width: (width-1200)/2}}/>
  )
}