import React, {useState, useEffect, FC, Dispatch, SetStateAction} from 'react';
import { Link } from "react-router-dom";
import queryString from 'query-string';
import Grid from "@material-ui/core/Grid";
import { accountRoutes } from '../accountRoutes'
import { usePageLayoutStyles } from '../../../assets/jss/pageLayoutStyles'
import { AlignCenter } from '../../../components/styledComponents/AlignCenter'
import { PageLoadingContent } from '../../../components'
import { TokenStatus } from '../variables'
import { accountLinks } from '../accountLinks'
import { minute } from "@yehonadav/timeunit";
import { alertService } from '../../alert'
import { call_verifyEmail } from '../api'
import { accountService } from '../service'
import {history} from "../../../utils";
import { verifyEmailPageTransition } from '../transitions'

const { Fade } = verifyEmailPageTransition;

export type VerifyEmailPageText = {
  verifyEmail: string;
  signIn: string;
  onSuccessMsg: string;
  verifyEmailContentText: {
    valid: string;
    invalid: string;
    forgotPasswordLink: string;
    afterLink: string;
    validating: string;
    missing: string;
    unknown: string;
  };
}

const verifyEmailPageText:VerifyEmailPageText = {
  verifyEmail: 'Verify Email',
  signIn: 'Sign In',
  onSuccessMsg: 'Verification successful, you can now login',
  verifyEmailContentText: {
    valid: 'Verification successful, you can now login',
    invalid: 'Verification failed, you can also verify your account using the',
    forgotPasswordLink: 'forgot password',
    afterLink: 'page.',
    validating: 'Verifying E-Mail',
    missing: 'Token is missing',
    unknown: 'Invalid token status',
  },
}

export interface IVerifyEmailPage {
  text?: VerifyEmailPageText;
}

export const preventTokenLossOnReRender:{token:any} = {
  token: null,
}

export const useOnVerifyEmailLoad = (
  setTokenStatus: Dispatch<SetStateAction<string>>,
  onSuccessMsg: string,
): void =>
{
  useEffect(() => {
    const { token } = queryString.parse(window.location.search);

    if (token) {
      preventTokenLossOnReRender.token = token;

      // remove token from url to prevent http referer leakage
      history.replace(window.location.pathname);
    }

    accountService.logout_if_logged();

    typeof preventTokenLossOnReRender.token === "string"
      ?
        call_verifyEmail(preventTokenLossOnReRender.token)
          .then(() => {
            alertService.success(onSuccessMsg, { timeout: minute });
            accountLinks.go_to_signin();
            setTokenStatus(TokenStatus.Valid);
          })
          .catch(() => {
            setTokenStatus(TokenStatus.Invalid);
          })
          .finally(() => {
            preventTokenLossOnReRender.token = null;
          })
      :
        setTokenStatus(TokenStatus.Missing);
  }, []);
}

export interface IVerifyEmailContent {
  tokenStatus:string;
  text?:VerifyEmailPageText['verifyEmailContentText'];
}

export const VerifyEmailContent:FC<IVerifyEmailContent> = (
  {
    tokenStatus,
    text=verifyEmailPageText.verifyEmailContentText
  }) =>
{
  return (
    <Grid item xs={12}>
      {(()=>{
        switch (tokenStatus) {
          case TokenStatus.Valid:
            return <AlignCenter>{text.valid}</AlignCenter>
          case TokenStatus.Invalid:
            return <AlignCenter>{text.invalid} <Link to={accountRoutes.forgot_password}>{text.forgotPasswordLink}</Link> {text.afterLink}</AlignCenter>;
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

const VerifyEmailPage:FC<IVerifyEmailPage> = ({text=verifyEmailPageText}) => {
  const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

  const classes = usePageLayoutStyles();

  useOnVerifyEmailLoad(setTokenStatus, text.onSuccessMsg);

  return (
    <Fade transitionProps={{timeout:800}}>
      <Grid container className={classes.form} justify={"center"} >
        <div className={classes.formTitle}>
          {text.verifyEmail}
        </div>
        <Fade delay={600} transitionProps={{timeout:800}}>
          <VerifyEmailContent tokenStatus={tokenStatus}/>
        </Fade>
        <Link to={accountRoutes.signin} className={classes.cancel}>{text.signIn}</Link>
      </Grid>
    </Fade>
  )
}

export { VerifyEmailPage };