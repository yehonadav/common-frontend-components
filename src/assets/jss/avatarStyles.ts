import makeStyles from '@material-ui/core/styles/makeStyles'
import { boxShadows } from '../../services'

export const useAvatarStyles = makeStyles({
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
  },

  avatarContainer: {
    width: 160,
    height: 160,
    backgroundColor: "#fff",
    borderRadius: "50%",
    padding: 5,
    boxShadow: boxShadows.boxShadowCookies,
  },

  avatarButton: {
    "& span": {
      margin: 0,
    },
    borderRadius: "50%",
  },

});