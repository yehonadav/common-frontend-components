import React, { FC, useEffect } from 'react'
import { useIsLogged } from '../hooks'
import { getLocation } from '../../router'
import { routes } from '../../../variables'
import { history } from '../../../utils'

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
        : { from: { pathname: routes.signup } };

      history.push(from);
    }
  }, [isLogged])

  return (
    <SilentSignInPage/>
  )
}