import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
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
import { accountRoutes } from '../accountRoutes'
import { usePageLayoutStyles } from '../../../assets/jss/pageLayoutStyles'

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

export const ResetPasswordForm:FC<{token:string}> = ({token}) => {
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
        alertService.success('Password reset successful, you can now login');
        accountLinks.go_to_signin();
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
        <PasswordInput error={errors.password?.message} inputRef={register} fullWidth required/>
      </Grid>

      <Grid item xs={12}>
        <PasswordInput error={errors.confirmPassword?.message} inputRef={register} fullWidth required label={"Confirm password"} name={"confirmPassword"}/>
      </Grid>

      <Grid container justify={"center"} style={{paddingTop: 60, width: "100%"}}>
        <BigRoundSecondaryButton type={"submit"}>
          <BtnLoad loading={isSubmitting} text={"Send"}/>
        </BigRoundSecondaryButton>
      </Grid>
    </Grid>
  );
}

const ResetPasswordContent:FC<{tokenStatus:string, token:string|null}> = ({tokenStatus, token}) => {
  if (tokenStatus === TokenStatus.Valid && token)
    return <ResetPasswordForm token={token}/>;

  return (
    <Grid item xs={12}>
      {(()=>{
        switch (tokenStatus) {
          case TokenStatus.Invalid:
            return <AlignCenter>Token validation failed, if the token has expired you can get a new one at the <Link to={accountRoutes.forgot_password}>forgot password</Link> page.</AlignCenter>;
          case TokenStatus.Validating:
            return <PageLoadingContent msg={"Validating token"} />;
          case TokenStatus.Missing:
            return <AlignCenter>Token is missing</AlignCenter>;
        }
        return <AlignCenter>Invalid token status</AlignCenter>;
      })()}
    </Grid>
  )
}

const ResetPasswordPage:FC = () => {
  const [token, setToken] = useState<string|null>(null);
  const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

  const classes = usePageLayoutStyles();

  useOnResetPasswordLoad(setToken, setTokenStatus)

  return (
    <Grid container className={classes.form} justify={"center"} >
      <div className={classes.formTitle}>
        Reset Password
      </div>

      <ResetPasswordContent tokenStatus={tokenStatus} token={token}/>

      <Link to={accountRoutes.signin} className={classes.cancel}>Cancel</Link>
    </Grid>
  )
}

export { ResetPasswordPage };