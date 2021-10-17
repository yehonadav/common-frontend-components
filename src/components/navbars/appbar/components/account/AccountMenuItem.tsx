import {withStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";

export const AccountMenuItem = withStyles({
  root: {
    fontSize: 14,
    width: 160,
  },
})(MenuItem);