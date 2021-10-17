import React, {FC} from "react";
import {MenuProps} from "@material-ui/core/Menu";
import {AccountMenuContainer} from "./AccountMenuContainer";
import {SimpleMenuItem} from "./SimpleMenuItem";
import FaceIcon from "@material-ui/icons/Face";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import Divider from "@material-ui/core/Divider";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { accountPageTransitions, accountService } from '../../../../../services/account';

export const AccountMenu: FC<MenuProps> = ({onClose, ...props}) => {
  const handleClick = (fn: () => void) => () => {
    onClose && onClose({}, 'backdropClick');
    fn();
  }

  return (
    <AccountMenuContainer onClose={onClose} {...props}>
      <SimpleMenuItem icon={FaceIcon} text={"פרופיל"} onClick={handleClick(accountPageTransitions.profile)}/>
      <SimpleMenuItem icon={PermIdentityIcon} text={"חשבון"} onClick={handleClick(accountPageTransitions.update_profile)}/>
      <Divider style={{margin: 10}}/>
      <SimpleMenuItem icon={ExitToAppIcon} text={"התנתק"} onClick={handleClick(accountService.logout)}/>
    </AccountMenuContainer>
  )
}