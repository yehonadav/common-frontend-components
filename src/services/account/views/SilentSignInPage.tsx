import React, { FC, useEffect } from 'react'
import { useIsLogged } from '../hooks'
import { getLocation } from '../../router'
import { routes } from '../../../variables'
import { history } from '../../../utils'
import { accountRoutes } from '../accountRoutes'
import { getRegisteredOnce } from '../stores'

export const SilentSignInPage:FC = () => {
  return (
    <>please wait...</>
  )
}

export interface ISilentSignInPageWrapper {
  silentSignInPage: FC;
}

export const SilentSignInPageWrapper = ({silentSignInPage: SilentSignInPage}:ISilentSignInPageWrapper):FC => () => {
  const isLogged = useIsLogged();

  useEffect(() => {
    if (isLogged !== null) {
      // @ts-ignore
      const { from } = isLogged
        ? (getLocation().state || { from: { pathname: routes.home } })
        : { from: { pathname: getRegisteredOnce() ? accountRoutes.signin : accountRoutes.signup } };

      history.push(from);
    }
  }, [isLogged])

  return (
    <SilentSignInPage/>
  )
}