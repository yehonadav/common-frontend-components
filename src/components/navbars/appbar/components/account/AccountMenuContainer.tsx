import {withStyles} from "@material-ui/core/styles";
import Menu, {MenuProps} from "@material-ui/core/Menu";

export const AccountMenuContainer = withStyles({
  paper: {
    marginTop: 10,
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));