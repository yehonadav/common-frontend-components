import React, { FC } from 'react'
import {ReactElement} from "react";
import Grid from "@material-ui/core/Grid";
import { usePageLayoutStyles } from '../../../assets/jss/pageLayoutStyles';
import {
  ChangeProfilePasswordForm,
  changeProfilePasswordFormText,
  ChangeProfilePasswordFormText
} from '../components/forms/ChangeProfilePasswordForm'
import { Avatar, GenericFileCrop, TonImage } from '../../../components';
import {
  UpdateProfileDetailsForm,
  updateProfileDetailsFormText,
  UpdateProfileDetailsFormText
} from '../components/forms/UpdateProfileDetailsForm'
import { image_height, image_width } from '../../../variables';
import { setUser } from '../stores/userStore';
import { alertService } from '../../alert';
import { accountService } from '../service';
import { seconds } from '@yehonadav/timeunit';
import { useUser } from '../hooks';
import { pageTransitions } from '../../../utils'
import { updateProfilePageTransition } from '../transitions'
import Button from '@material-ui/core/Button'

const { Fade, Slide } = updateProfilePageTransition;

export type UpdateProfilePageText = {
  goBack: string;
  updateImgSuccessful: string;
  updateProfileDetailsFormText: UpdateProfileDetailsFormText;
  changeProfilePasswordFormText: ChangeProfilePasswordFormText;
}

const updateProfilePageText:UpdateProfilePageText = {
  goBack: 'Go Back',
  updateImgSuccessful: 'Update successful',
  updateProfileDetailsFormText,
  changeProfilePasswordFormText,
}

export interface IUpdateProfilePage {
  text?: UpdateProfilePageText;
}

export const GoBack:FC<{text:UpdateProfilePageText['goBack']}> = ({text}) => {
  const classes = usePageLayoutStyles();

  return (
    <Grid container className={classes.form} justify={"flex-end"} spacing={3} style={{padding: 40, paddingBottom: 100, paddingTop: 0}}>
      <Slide delay={1400} transitionProps={{direction:"left", timeout:800, mountOnEnter:true, unmountOnExit:true}}>
        <Fade delay={1400} transitionProps={{timeout:800}}>
          <Button onClick={pageTransitions.goBackOrHome} color={'primary'}>
            {text}
          </Button>
        </Fade>
      </Slide>
    </Grid>
  )
}

export const UpdateProfilePhoto = ({text}:{text:UpdateProfilePageText['updateImgSuccessful']}): ReactElement|null => {
  const classes = usePageLayoutStyles();
  const user = useUser();

  if (!user)
    return null;

  const onImage:TonImage = ({file, imageSrc}) => {

    // update pic locally
    imageSrc && setUser({...user, avatar: imageSrc, avatar_hd: imageSrc});

    accountService.update_avatar(user.id, file)
      .then(() => {
        alertService.success(text, { timeout: 3 * seconds});
        imageSrc && setUser({...user, avatar: imageSrc, avatar_hd: imageSrc});
      })
      .catch(error => {
        alertService.error(error);

        // revoke local update
        imageSrc && setUser({...user});
      })
  };

  return (
    <Grid container className={classes.form} justify={"center"} spacing={3} style={{paddingBottom: 0}}>
      <Grid item xs={12}>
        <GenericFileCrop
          render={({selectFile}) => <Avatar user={user} onClick={selectFile}/>}
          aspect={image_width/image_height}
          onImage={onImage}
          width={image_width}
          height={image_height}
        />
      </Grid>
    </Grid>
  )
}

export const UpdateProfilePage:FC<IUpdateProfilePage> = ({text=updateProfilePageText}) => {
  const classes = usePageLayoutStyles();
  updateProfilePageTransition.useSetOnLoad();
  return (
    <Fade transitionProps={{timeout:800}}>
      <Grid container className={classes.form} justify={"center"} spacing={3}>
        <Grid item xs={12}>
          <Slide delay={100} transitionProps={{direction:"left", timeout:800, mountOnEnter:true, unmountOnExit:true}}>
            <Fade delay={100} transitionProps={{timeout:800}}>
              <UpdateProfilePhoto text={text.updateImgSuccessful}/>
            </Fade>
          </Slide>
        </Grid>

        <Grid item xs={12}>
          <UpdateProfileDetailsForm text={text.updateProfileDetailsFormText}/>
        </Grid>

        <div style={{width:'100%', margin: 20}}/>

        <Grid item xs={12}>
          <ChangeProfilePasswordForm text={text.changeProfilePasswordFormText}/>
        </Grid>

        <div style={{width:'100%', margin: 15}}/>

        <Grid item xs={12}>
          <GoBack text={text.goBack}/>
        </Grid>
      </Grid>
    </Fade>
  )
}
