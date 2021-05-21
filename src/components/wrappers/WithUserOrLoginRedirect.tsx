import React, { FC } from 'react'
import { useUser, } from '../../services'
import { links } from '../../utils'

export function WithUserOrLoginRedirect<Props>(Component:FC<Props>) {
  return (props:Props) => {
    const user = useUser();

    if (!user) {
      links.go_to_signin();
      return null;
    }

    return (
      <Component user={user} {...props}/>
    )
  }
}