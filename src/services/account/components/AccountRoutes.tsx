import React, { FC, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { accountRoutes } from '../accountRoutes'
import { ForgotPasswordPage, RegisterPage, ResetPasswordPage, SignInPage, VerifyEmailPage } from '../views'
import { UpdateProfilePage } from '../views'
import { useIsLogged } from '../hooks'
import { getLocation } from '../../router'
import { routes } from '../../../variables'
import { history } from "../../../utils";

export const AccountRoutes:FC = () => {
  return (
    <Switch>
      <Route exact path={accountRoutes.invalid_role} component={()=><h2>invalid_role</h2>} />
      <Route exact path={accountRoutes.silent_signin} component={()=>{
        const isLogged = useIsLogged();

        useEffect(() => {
          if (isLogged !== null) {
            const redirectHome = { from: { pathname: routes.home } };
            // @ts-ignore
            const { from } = isLogged ? (getLocation().state || redirectHome) : redirectHome;
            history.push(from);
          }
        }, [isLogged])

        return <>please wait...</>;
      }} />
      <Route exact path={accountRoutes.signin} component={SignInPage} />
      <Route exact path={accountRoutes.signup} component={RegisterPage} />
      <Route exact path={accountRoutes.verify_email} component={VerifyEmailPage} />
      <Route exact path={accountRoutes.forgot_password} component={ForgotPasswordPage} />
      <Route exact path={accountRoutes.reset_password} component={ResetPasswordPage} />
      <Route exact path={accountRoutes.update_profile} component={UpdateProfilePage} />
    </Switch>
  )
}
