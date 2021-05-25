import Grid, {GridProps} from "@material-ui/core/Grid";
import React, {FC} from "react";

export const getGridTableRatio = (...args: number[]): string[] => {
  const sum = args.reduce((a, b) => a + b);
  return args.map(i => `${100 * i / sum}%`)
}

export type GridCellProps = GridProps & {
  width: string | number;
}

export const GridCell: FC<GridCellProps> = ({width, ...props}) =>
  <Grid item style={{width}} {...props}/>;

