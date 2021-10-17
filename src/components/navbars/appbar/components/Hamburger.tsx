import {useState} from 'react'
import IconButton, {IconButtonTypeMap} from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close';
import Fade from "@material-ui/core/Fade";
import {OverridableComponent, OverrideProps} from "@material-ui/core/OverridableComponent";
import {SvgIconTypeMap} from "@material-ui/core/SvgIcon/SvgIcon";
import {ExtendButtonBaseTypeMap} from "@material-ui/core";
import {useAppbarStyles} from "../useAppbarStyles";
import { sidebarStore } from '../../../../stores/useSidebarStores'
import { sleep } from '../../../../utils/sleep'
import { WithUser } from '../../../wrappers/WithUser'
import React from 'react';

const useHamburger = () => {
  const sidebar = sidebarStore.useOpen();

  const [Icon, setIcon] = useState<OverridableComponent<SvgIconTypeMap>>(sidebar ? CloseIcon : MenuIcon);
  const [open, setOpen] = useState(true);

  const handleClick = async () => {
    sidebarStore.setOpen(!sidebar);
    setOpen(false);
    await sleep(400);
    setOpen(true);
    setIcon(!sidebar ? CloseIcon : MenuIcon);
  }

  return {
    sidebar,
    Icon,
    open,
    handleClick,
  }
}

export const Hamburger = WithUser<OverrideProps<ExtendButtonBaseTypeMap<IconButtonTypeMap>, 'button'>>((props) => {
  const { sidebar, Icon, open, handleClick } = useHamburger();
  const classes = useAppbarStyles();
  return (
    <Fade in={open} timeout={400}>
      <IconButton
        className={classes.appBarIconButton}
        edge="start"
        color="inherit"
        aria-label="Menu"
        aria-controls="navigation"
        aria-expanded={sidebar?"true":"false"}
        onClick={handleClick}
        {...props}
      >
        <Icon/>
      </IconButton>
    </Fade>
  );
});