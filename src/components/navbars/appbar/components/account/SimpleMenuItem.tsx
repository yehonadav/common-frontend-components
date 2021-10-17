import {FC, ReactNode} from "react";
import {AccountMenuItem} from "./AccountMenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";

interface ISimpleMenuItem {
  onClick: () => void;
  icon: typeof SvgIcon;
  text: ReactNode;
}

export const SimpleMenuItem: FC<ISimpleMenuItem> = ({onClick, icon: Icon, text}) =>
  <AccountMenuItem onClick={onClick}>
    <ListItemIcon>
      <Icon fontSize="small"/>
    </ListItemIcon>
    <ListItemText primary={text}/>
  </AccountMenuItem>;