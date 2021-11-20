import {IconButtonTypeMap} from '@material-ui/core/IconButton'
import {OverrideProps} from "@material-ui/core/OverridableComponent";
import {ExtendButtonBaseTypeMap} from "@material-ui/core";
import { WithUser } from '../../../wrappers/WithUser'
import React from 'react';
import { Hamburger } from './Hamburger'

export const HamburgerWithUser = WithUser<OverrideProps<ExtendButtonBaseTypeMap<IconButtonTypeMap>, 'button'>>((props) => {
  return (
    <Hamburger {...props}/>
  );
});