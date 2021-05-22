import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';

export const Input = withStyles({
  root: {
    minWidth: 267,

    "& label": {
      lineHeight: 0.7,
      font: "normal normal normal 18px/24px Segoe UI",
      letterSpacing: 0,
      color: "#504F5989",
    },

    "& ::after": {
      border: "1px solid #707070",
    },
  },
})(TextField);