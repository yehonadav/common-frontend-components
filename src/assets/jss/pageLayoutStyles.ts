import makeStyles from '@material-ui/core/styles/makeStyles'

export const usePageLayoutStyles = makeStyles({
  root: {
    position: 'relative',
    zIndex: 1,
    width: "100%",
    minHeight: 900,
    height: "100%",
    background: "transparent linear-gradient(180deg, #a1dff2b0 30%, #ffffff 100%) 0% 0% no-repeat padding-box",
  },

  content: {
    position:'relative',
    zIndex: 1,
  },

  logo: {
    marginTop: 20,
    marginBottom: 30,
  },

  form: {
    maxWidth: 780,
    padding: 20,

    "& p": {
      width: "100%",
      font: "normal normal normal 18px/24px Segoe UI",
      color: "#303B4B",
    },
    paddingBottom: 100,
    paddingTop: 50,
  },

  formTitle: {
    width: "100%",
    font: "normal normal 600 45px/60px Segoe UI",
    color: "#5E9FFF",
    padding: 20,
    marginBottom: 20,
  },

  actions: {
    paddingTop: 42,
    width: "100%",
  },

  bg: {
    position: "absolute",
    zIndex: 0,
    bottom: 0,
    width: "120%",
  },

  cancel: {
    marginTop: 30,
  },

});