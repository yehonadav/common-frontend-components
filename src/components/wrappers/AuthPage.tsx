import React, { FC } from 'react'
import { getLocation, useIsLogged } from '../../services'
import { Redirect } from 'react-router-dom'
import { routes } from '../../variables'

export function AuthPage<Props=any>(Component: FC<Props>):typeof Component {
  return (props) => {
    const isLogged = useIsLogged();

    // while attempting silent token refresh before startup
    if (isLogged===null)
      return <Redirect to={{ pathname: routes.silent_signin, state: { from: getLocation() } }} />;

    // not logged in so redirect to login page with the return url
    if (!isLogged)
      return <Redirect to={{ pathname: routes.signup, state: { from: getLocation() } }} />;

    // authorized so return component
    return (
      <Component {...props}/>
    )
  }
}