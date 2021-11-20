import {IconButtonTypeMap} from '@material-ui/core/IconButton'
import {OverrideProps} from "@material-ui/core/OverridableComponent";
import {ExtendButtonBaseTypeMap} from "@material-ui/core";
import { WithUser } from '../../../wrappers/WithUser'
import React from 'react';
import { Hamburger } from './Hamburger'
import { useLocation } from 'react-router-dom'
import { accountRoutes } from '../../../../services/account/accountRoutes'

export const HamburgerHideInAccount = WithUser<OverrideProps<ExtendButtonBaseTypeMap<IconButtonTypeMap>, 'button'>>((props) => {
  const location = useLocation();

  if (location.pathname.startsWith(accountRoutes.account))
    return <></>;

  return (
    <Hamburger {...props}/>
  );
});