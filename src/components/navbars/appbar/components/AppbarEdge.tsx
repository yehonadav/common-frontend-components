import {FC} from "react";
import {useWidth} from "common-frontend-components";

export const AppbarEdge:FC = () => {
  const width = useWidth();

  if (width <= 1200)
    return null;

  return (
    <div style={{width: (width-1200)/2}}/>
  )
}