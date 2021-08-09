import React, { FC } from 'react'
import {ReactElement} from "react";
import Grid from "@material-ui/core/Grid";
import { usePageLayoutStyles } from '../../../assets/jss/pageLayoutStyles';
import { ChangeProfilePasswordForm } from '../components/forms/ChangeProfilePasswordForm';
import { Avatar, GenericFileCrop, RoundPrimaryButton, TonImage } from '../../../components';
import {
  UpdateProfileDetailsForm,
  updateProfileDetailsFormText,
  UpdateProfileDetailsFormText
} from '../components/forms/UpdateProfileDetailsForm'
import { image_height, image_width } from '../../../variables';
import { setUser } from '../useStore';
import { alertService } from '../../alert';
import { accountService } from '../service';
import { seconds } from '@yehonadav/timeunit';
import { useUser } from '../hooks';
import { links } from '../../../utils';

export type UpdateProfilePageText = {
  goBack: string;
  updateSuccessful: string;
  updateProfileDetailsFormText: UpdateProfileDetailsFormText;
}

const updateProfilePageText:UpdateProfilePageText = {
  goBack: 'Go Back',
  updateSuccessful: 'Update successful',
  updateProfileDetailsFormText,
}

export interface IUpdateProfilePage {
  text?: UpdateProfilePageText;
}

export const GoBack:FC<IUpdateProfilePage> = ({text}) => {
  const classes = usePageLayoutStyles();

  return (
    <Grid container className={classes.form} justify={"flex-end"} spacing={3} style={{padding: 40, paddingBottom: 100, paddingTop: 0}}>
      <RoundPrimaryButton onClick={links.goBackOrHome}>
        {text.goBack}
      </RoundPrimaryButton>
    </Grid>
  )
}

export const UpdateProfilePhoto = ({text}:IUpdateProfilePage): ReactElement|null => {
  const classes = usePageLayoutStyles();
  const user = useUser();

  if (!user)
    return null;

  const onImage:TonImage = ({file, imageSrc}) => {

    // update pic locally
    imageSrc && setUser({...user, avatar: imageSrc, avatar_hd: imageSrc});

    accountService.update_avatar(user.id, file)
      .then(() => {
        alertService.success(text.updateSuccessful, { timeout: 3 * seconds});
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
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <UpdateProfilePhoto text={text}/>
        <UpdateProfileDetailsForm text={text.updateProfileDetailsFormText}/>
        <ChangeProfilePasswordForm text={text}/>
        <GoBack text={text}/>
      </div>
    </div>
  )
}
