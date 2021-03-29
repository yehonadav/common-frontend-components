import React, {FC} from 'react';
import BackDrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import {useBackdropIsLoading} from "./useStore";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const Backdrop: FC = () => {
  const classes = useStyles();
  const backdropIsLoading = useBackdropIsLoading();

  return (
    <BackDrop className={classes.backdrop} open={backdropIsLoading}>
      <CircularProgress color="inherit" />
    </BackDrop>
  );
};