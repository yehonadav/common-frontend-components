import React, { FC } from 'react'
import { getLocation, User } from '../../services'
import { Redirect } from 'react-router-dom'
import { routes } from '../../variables'

export interface IWithRole<Props> {
  component: FC<Props & {user: User}>;
  roles: string[];
}

export function WithRole<Props={}>({ component: Component, roles }:IWithRole<Props>):FC<Props & {user: User}> {
  return (props) => {
    // check if route is restricted by role
    if (!roles.find(i => i === props.user.role))
      // role not authorized so redirect to home page
      return <Redirect to={{ pathname: routes.invalid_role, state: { from: getLocation() } }} />;

    // authorized so return component
    return (
      <Component {...props}/>
    )
  }
}