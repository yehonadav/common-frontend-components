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

export const preventTokenLossOnReRender:{token:any} = {
  token: null,
}

export const useOnVerifyEmailLoad = (
  setTokenStatus: Dispatch<SetStateAction<string>>,
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
            alertService.success('Verification successful, you can now login', { timeout: minute });
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

export const VerifyEmailContent:FC<{tokenStatus:string}> = ({tokenStatus}) => {
  return (
    <Grid item xs={12}>
      {(()=>{
        switch (tokenStatus) {
          case TokenStatus.Valid:
            return <AlignCenter>Verification successful, you can now login</AlignCenter>
          case TokenStatus.Invalid:
            return <AlignCenter>Verification failed, you can also verify your account using the <Link to={accountRoutes.forgot_password}>forgot password</Link> page.</AlignCenter>;
          case TokenStatus.Validating:
            return <PageLoadingContent msg={"Verifying E-Mail"} />;
          case TokenStatus.Missing:
            return <AlignCenter>Token is missing</AlignCenter>;
        }
        return <AlignCenter>Invalid token status</AlignCenter>;
      })()}
    </Grid>
  )
}

const VerifyEmailPage:FC = () => {
  const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

  const classes = usePageLayoutStyles();

  useOnVerifyEmailLoad(setTokenStatus);

  return (
    <Grid container className={classes.form} justify={"center"} >
      <div className={classes.formTitle}>
        Verify Email
      </div>

      <VerifyEmailContent tokenStatus={tokenStatus}/>

      <Link to={accountRoutes.signin} className={classes.cancel}>Sign In</Link>
    </Grid>
  )
}

export { VerifyEmailPage };