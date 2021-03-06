import React, { FC, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Grid from "@material-ui/core/Grid";
import { forgotPasswordValivationSchema } from '../../../validations'
import { call_forgotPassword } from '../api'
import { alertService } from '../../alert'
import { EmailInput } from '../../../components/inputs'
import { BigRoundSecondaryButton } from '../../../components/buttons'
import { BtnLoad } from '../../../components'
import { usePageLayoutStyles } from '../../../assets/jss/pageLayoutStyles'
import { forgotPasswordPageTransition } from '../transitions'
import { useThemeStyle } from '../../theme'
import { accountPageTransitions } from '../accountRoutes'

export type ForgotPasswordPageText = {
  onSuccessMsg: string;
  title: string;
  emailLabel: string;
  send: string;
  pleaseWait: string;
  cancel: string;
}

export const forgotPasswordPageText:ForgotPasswordPageText = {
  onSuccessMsg: 'Please check your email for password reset instructions',
  title: 'Forgot Password',
  emailLabel: 'Email',
  send: 'Send Link To Email',
  pleaseWait: 'Please wait',
  cancel: 'Cancel',
}

export interface IForgotPasswordPage {
  text?: ForgotPasswordPageText;
}

export const ForgotPasswordPage:FC<IForgotPasswordPage> = ({text=forgotPasswordPageText}) => {
  const [isSubmitting, setSubmitting] = useState(false);

  forgotPasswordPageTransition.useSetOnLoad();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(forgotPasswordValivationSchema)
  });

  function onSubmit({email}:{email:string}) {
    setSubmitting(true);
    call_forgotPassword(email)
      .then(() => {
        alertService.success(text.onSuccessMsg);
        accountPageTransitions.signin();
      })
      .catch(error => alertService.error(error))
      .finally(() => setSubmitting(false));
  }

  const classes = usePageLayoutStyles();

  const { Slide, Fade } = forgotPasswordPageTransition;
  const theme = useThemeStyle();

  return (
    <Fade transitionProps={{timeout:800}} divProps={{className:classes.formContainer}}>
      <Grid container component={'form'} className={classes.form} justify={"center"} onSubmit={handleSubmit(onSubmit)}>

        <div className={classes.formTitle} style={{color: theme.colors.primary}}>
          {text.title}
        </div>

        <Slide delay={100} transitionProps={{direction:"right", timeout:800, mountOnEnter:true, unmountOnExit:true}}>
          <Fade delay={100} transitionProps={{timeout:800}}>
            <EmailInput error={errors.email?.message} inputRef={register} label={text.emailLabel}/>
          </Fade>
        </Slide>

        <Grid container justify={"center"} className={classes.actions} style={{paddingTop: 60}}>
          <Fade delay={500} transitionProps={{timeout:800}}>
            <BigRoundSecondaryButton type={"submit"}>
              <BtnLoad loading={isSubmitting} text={text.send} loadText={text.pleaseWait}/>
            </BigRoundSecondaryButton>
          </Fade>
        </Grid>

        <Fade delay={1000} transitionProps={{timeout:800}}>
          <div
            onClick={accountPageTransitions.signin}
            className={classes.cancel}
          >
            {text.cancel}
          </div>
        </Fade>
      </Grid>
    </Fade>
  );
}
