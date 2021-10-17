import React, {FC, useState} from "react";
import IconButton, {IconButtonTypeMap} from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {MenuProps} from '@material-ui/core/Menu';
import {OverrideProps} from "@material-ui/core/OverridableComponent";
import {ExtendButtonBaseTypeMap} from "@material-ui/core";
import {AccountMenu} from "./AccountMenu";
import {useAppbarStyles} from "../../useAppbarStyles";
import { WithUser } from '../../../../wrappers/WithUser';
import { DivType } from '../../../../../types'

export interface IAppbarAccount {
  containerProps?: DivType;
  iconProps?: OverrideProps<ExtendButtonBaseTypeMap<IconButtonTypeMap>, 'button'>;
  icon?: FC;
  menu?: FC<MenuProps>;
}

export const AppbarAccount = WithUser<IAppbarAccount>((
  {
    containerProps={},
    iconProps={},
    icon:Icon=AccountCircle,
    menu:Menu=AccountMenu,
  }) =>
{
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useAppbarStyles();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div {...containerProps}>
      <IconButton
        className={classes.appBarIconButton}
        aria-label="account of current user"
        aria-controls="menu-appbar-account"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        {...iconProps}
      >
        <Icon/>
      </IconButton>
      <Menu
        id="menu-appbar-account"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      />
    </div>
  )
});
