import React, { FC } from 'react'
import { useUser, } from '../../services'

export function WithUser<Props>(Component:FC<Props>) {
  return (props:Props) => {
    const user = useUser();

    if (!user)
      return null;

    return (
      <Component user={user} {...props}/>
    )
  }
}