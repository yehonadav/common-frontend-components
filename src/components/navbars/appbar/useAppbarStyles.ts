import makeStyles from "@material-ui/core/styles/makeStyles";

export const useAppbarStyles = makeStyles(theme=>({
  appbar: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },

  toolBarOnTop: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },

  toolBarOnScroll: {
    backgroundColor: theme.palette.primary.light,
  },

  toolBar: {
    paddingTop: 10,
    transition: 'background 1s',
  },

  AppbarPlaceholder: {
    width: "100%",
    minHeight: 64,
    padding: 20,
  },

  FlexSpace: {
    flexGrow: 1,
  },

  appBarIconButton: {
    transition: 'color 1s'
  }
}))