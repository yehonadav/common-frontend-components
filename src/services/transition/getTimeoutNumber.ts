import {TransitionProps} from "@material-ui/core/transitions/transition";

export const getTimeoutNumber = (timeout: TransitionProps['timeout'], open: boolean, appear?: boolean):number => {
  if (timeout === undefined)
    return 0;

  if (typeof timeout === 'number')
    return timeout;

  if (timeout.appear && appear)
    return timeout.appear;

  if (timeout.enter && open)
      return timeout.enter;

  if (timeout.exit && !open)
    return timeout.exit;

  return 0;
}