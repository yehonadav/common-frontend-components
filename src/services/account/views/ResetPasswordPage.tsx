import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import queryString from 'query-string';
import Grid from "@material-ui/core/Grid";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { accountService } from '../service'
import {history} from "../../../utils";
import { call_resetPassword, call_validateResetToken } from '../api'
import { TokenStatus } from '../variables'
import { resetPasswordValidationSchema } from '../../../validations'
import { alertService } from '../../alert'
import { accountLinks } from '../accountLinks'
import { BigRoundSecondaryButton, BtnLoad, PageLoadingContent, PasswordInput } from '../../../components'
import { AlignCenter } from '../../../components/styledComponents/AlignCenter'
import { usePageLayoutStyles } from '../../../assets/jss/pageLayoutStyles'
import { resetPasswordPageTransition } from '../transitions'
import { LinkInText } from '../components/LinkInText'

const { Slide, Fade } = resetPasswordPageTransition;

export type ResetPasswordPageText = {
  title: string;

  resetPasswordContentText: {
    resetPasswordFormText: {
      onSuccess: string;
      passwordLabel: string;
      confirmPasswordLabel: string;
      send: string;
      pleaseWait: string;
    };

    invalid: string;
    forgotPasswordLink: string;
    afterLink: string;
    validating: string;
    missing: string;
    unknown: string;
  }

  cancel: string;
}

const resetPasswordPageText:ResetPasswordPageText = {
  title: 'Reset Password',

  resetPasswordContentText: {
    resetPasswordFormText: {
      onSuccess: 'Password reset successful, you can now login',
      passwordLabel: 'Password',
      confirmPasswordLabel: 'Confirm password',
      send: 'Send',
      pleaseWait: 'Please wait'
    },

    invalid: 'Token validation failed, if the token has expired you can get a new one at the',
    forgotPasswordLink: 'forgot password',
    afterLink: 'page.',
    validating: 'Validating token',
    missing: 'Token is missing',
    unknown: 'Invalid token status',
  },

  cancel: 'Cancel',
}

export interface IResetPasswordPage {
  text?: ResetPasswordPageText;
}

export const useOnResetPasswordLoad = (
  setToken: Dispatch<SetStateAction<string|null>>,
  setTokenStatus: Dispatch<SetStateAction<string>>,
  ): void =>
{
  useEffect(() => {
    const { token } = queryString.parse(window.location.search);

    accountService.logout_if_logged();

    // remove token from url to prevent http referer leakage
    history.replace(window.location.pathname);

    typeof token === "string" ? call_validateResetToken(token)
      .then(() => {
        setToken(token);
        setTokenStatus(TokenStatus.Valid);
      })
      .catch(() => {
        setTokenStatus(TokenStatus.Invalid);
      }) : setTokenStatus(TokenStatus.Missing);
  }, []);
}

export interface IResetPasswordForm {
  token: string;
  text?: ResetPasswordPageText['resetPasswordContentText']['resetPasswordFormText'];
}

export const ResetPasswordForm:FC<IResetPasswordForm> = ({token, text=resetPasswordPageText.resetPasswordContentText.resetPasswordFormText}) => {
  const [isSubmitting, setSubmitting] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(resetPasswordValidationSchema)
  });

  const onSubmit = handleSubmit(({password, confirmPassword}:{password:string, confirmPassword:string}) => {
    if (isSubmitting)
      return;

    setSubmitting(true);
    call_resetPassword({ token, password, confirmPassword })
      .then(() => {
        alertService.success(text.onSuccess);
        resetPasswordPageTransition.exit(500).then(accountLinks.go_to_signin)
      })
      .catch(error => {
        alertService.error(error);
      })
      .finally(() => {
        setSubmitting(false)
      });
  });

  return (
    <Grid container component={'form'} onSubmit={onSubmit} spacing={3}>
      <Grid item xs={12}>
        <Slide delay={100} transitionProps={{direction:"right", timeout:800, mountOnEnter:true, unmountOnExit:true}}>
          <Fade delay={100} transitionProps={{timeout:800}}>
            <PasswordInput error={errors.password?.message} inputRef={register} fullWidth required label={text.passwordLabel}/>
          </Fade>
        </Slide>
      </Grid>

      <Grid item xs={12}>
        <Slide delay={300} transitionProps={{direction:"right", timeout:800, mountOnEnter:true, unmountOnExit:true}}>
          <Fade delay={300} transitionProps={{timeout:800}}>
            <PasswordInput error={errors.confirmPassword?.message} inputRef={register} fullWidth required label={text.confirmPasswordLabel} name={"confirmPassword"}/>
          </Fade>
        </Slide>
      </Grid>

      <Grid container justify={"center"} style={{paddingTop: 60, width: "100%"}}>
        <Fade delay={700} transitionProps={{timeout:800}}>
          <BigRoundSecondaryButton type={"submit"}>
            <BtnLoad loading={isSubmitting} text={text.send} loadText={text.pleaseWait}/>
          </BigRoundSecondaryButton>
        </Fade>
      </Grid>
    </Grid>
  );
}

interface IResetPasswordContent {
  tokenStatus: string;
  token: string|null;
  text?: ResetPasswordPageText['resetPasswordContentText'];
}

const handleForgotPasswordClick = () => resetPasswordPageTransition.exit(500)
  .then(accountLinks.go_to_forgot_password);

const ResetPasswordContent:FC<IResetPasswordContent> = ({tokenStatus, token, text=resetPasswordPageText.resetPasswordContentText}) => {
  if (tokenStatus === TokenStatus.Valid && token)
    return <ResetPasswordForm token={token} text={text.resetPasswordFormText}/>;

  return (
    <Grid item xs={12}>
      {(()=>{
        switch (tokenStatus) {
          case TokenStatus.Invalid:
            return <AlignCenter>{text.invalid} <LinkInText onClick={handleForgotPasswordClick}>{text.forgotPasswordLink}</LinkInText> {text.afterLink}</AlignCenter>;
          case TokenStatus.Validating:
            return <PageLoadingContent msg={text.validating} />;
          case TokenStatus.Missing:
            return <AlignCenter>{text.missing}</AlignCenter>;
        }
        return <AlignCenter>{text.unknown}</AlignCenter>;
      })()}
    </Grid>
  )
}

const ResetPasswordPage:FC<IResetPasswordPage> = ({text=resetPasswordPageText}) => {
  const [token, setToken] = useState<string|null>(null);
  const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

  resetPasswordPageTransition.useSetOnLoad();

  const classes = usePageLayoutStyles();

  useOnResetPasswordLoad(setToken, setTokenStatus)

  return (
    <Fade transitionProps={{timeout:800}} divProps={{className:classes.formContainer}}>
      <Grid container className={classes.form} justify={"center"} >
        <div className={classes.formTitle}>
          {text.title}
        </div>

        <ResetPasswordContent tokenStatus={tokenStatus} token={token} text={text.resetPasswordContentText}/>

        <Fade delay={1100} transitionProps={{timeout:800}}>
          <div
            onClick={()=>resetPasswordPageTransition.exit(500).then(accountLinks.go_to_signin)}
            className={classes.cancel}
          >
            {text.cancel}
          </div>
        </Fade>
      </Grid>
    </Fade>
  )
}

export { ResetPasswordPage };