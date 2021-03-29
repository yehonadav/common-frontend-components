import {makeStyles} from "@material-ui/core";

export const useInstallServiceStyles = makeStyles({
  root: {
    position: "fixed",
    zIndex: 300,
    width: "100%",
    bottom: 0,
    padding: 10,
  },

  paper: {
    backgroundColor: '#edf3ff',
    border: '1px solid #ababab',
    borderRadius: 5,
    display: 'block',
    padding: 10,
  },

  logo: {
    width: 299*0.85,
    height: 139*0.85,
    margin: 10,
  },

  logoSmall: {
    width: 299*0.55,
    height: 139*0.55,
  },
});