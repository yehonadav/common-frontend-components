import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import { accountRoutes } from '../accountRoutes'
import { ForgotPasswordPage, ResetPasswordPage, SignInPage, VerifyEmailPage } from '../views'
import { UpdateProfilePage } from '../views'
import { InvalidRolePage } from '../views/InvalidRolePage'
import { ISilentSignInPageWrapper, SilentSignInPage, SilentSignInPageWrapper } from '../views/SilentSignInPage'
import { SignUpPage } from '../views/SignUpPage'

export interface IAccountRoutes {
  invalidRolePage?: FC;
  silentSignInPage?: FC;
  silentSignInPageWrapper?: (props:ISilentSignInPageWrapper) => FC;
  signinPage?: FC;
  signupPage?: FC;
  verifyEmailPage?: FC;
  forgotPasswordPage?: FC;
  resetPasswordPage?: FC;
  updateProfilePage?: FC;
}

export const AccountRoutes:FC<IAccountRoutes> = (
  {
    invalidRolePage=InvalidRolePage,
    silentSignInPage=SilentSignInPage,
    silentSignInPageWrapper=SilentSignInPageWrapper,
    signinPage=SignInPage,
    signupPage=SignUpPage,
    verifyEmailPage=VerifyEmailPage,
    forgotPasswordPage=ForgotPasswordPage,
    resetPasswordPage=ResetPasswordPage,
    updateProfilePage=UpdateProfilePage,
  }) => {
  return (
    <Switch>
      <Route exact path={accountRoutes.invalid_role} component={invalidRolePage} />
      <Route exact path={accountRoutes.silent_signin} component={silentSignInPageWrapper({silentSignInPage})} />
      <Route exact path={accountRoutes.signin} component={signinPage} />
      <Route exact path={accountRoutes.signup} component={signupPage} />
      <Route exact path={accountRoutes.verify_email} component={verifyEmailPage} />
      <Route exact path={accountRoutes.forgot_password} component={forgotPasswordPage} />
      <Route exact path={accountRoutes.reset_password} component={resetPasswordPage} />
      <Route exact path={accountRoutes.update_profile} component={updateProfilePage} />
    </Switch>
  )
}
