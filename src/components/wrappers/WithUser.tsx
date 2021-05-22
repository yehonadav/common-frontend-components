import React, { FC } from 'react'
import { User, useUser } from '../../services'

export function WithUser<Props={}>(Component:FC<Props & {user:User}>):FC<Props> {
  return (props) => {
    const user = useUser();

    if (!user)
      return null;

    return (
      <Component user={user} {...props}/>
    )
  }
}