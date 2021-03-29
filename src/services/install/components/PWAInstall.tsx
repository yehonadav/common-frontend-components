import React, { FC } from 'react'
import {useEffect} from "react";
import {onInstallServiceInstall, onInstallServiceClose, onInstallServiceOpenDialog} from '../actions'
import {useReactPWAInstall} from "react-pwa-install";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Slide from '@material-ui/core/Slide'
import {useInstallServiceStyles} from '../styles'
import {InstallLogo} from './InstallLogo'
import { useIsInstallDialogClicked, useIsInstallDialogOpen } from '../hooks'

export const PWAInstall:FC = () => {
  const classes = useInstallServiceStyles();

  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

  const open = useIsInstallDialogOpen();
  const clicked = useIsInstallDialogClicked();

  const canInstall = !clicked && supported() && !isInstalled();

  // if user is logged and can install, show popup once
  useEffect(() => {
    if (canInstall) {
      onInstallServiceOpenDialog()
    }
  }, [canInstall]);

  if (!open)
    return null;

  return (
    <div className={classes.root}>
      <Slide direction="right" timeout={400} in={true} mountOnEnter unmountOnExit>
        <Paper className={classes.paper}>
          <Grid container justify={'flex-end'}>
            <Grid container justify={'center'} spacing={2} style={{width:'100%', maxWidth: 300}}>
              <Grid item xs={12}>
                <Grid container justify={'center'} spacing={2}>
                  <InstallLogo/>
                </Grid>
              </Grid>

              <Grid item>
                <Button variant="contained" color="primary" onClick={()=>onInstallServiceInstall(pwaInstall)}>
                  Install The App
                </Button>
              </Grid>

              <Grid item>
                <Button color="secondary" onClick={onInstallServiceClose}>
                  No Thanks
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Slide>
    </div>
  );
};