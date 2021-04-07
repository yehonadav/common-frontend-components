import {getUser, setUserStore} from './useStore'
import {refreshToken} from './actions'
import * as api from './api'
import { alertService } from "../alert/service"
import {clearCachedData} from "../ClearData";
import {IAlertOptionals} from '../alert';
import {User} from "./types";
import { setBackdrop } from '../backdrop'

// function holder
let refreshTokenTimeout: NodeJS.Timeout;

export const startRefreshTokenTimer = ():void => {
  const user = getUser();
  if (user) {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(user.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    refreshTokenTimeout = setTimeout(refreshToken, timeout);
  }
};

export const stopRefreshTokenTimer = ():void =>
  clearTimeout(refreshTokenTimeout);

export const handleLogin = (user: User):User => {
  setUserStore({
    user,
    isLogged: true,
    didLogin: true,
    loggedOut: false,
  });
  startRefreshTokenTimer();
  return user;
};

export type T_logout = (msg?:string, options?:IAlertOptionals) => Promise<void>;

export const _logout:T_logout = async (msg, options) => {
  setBackdrop(true);

  // revoke token
  api.call_revoke_token().finally(() => {
    setBackdrop(false);

    // DON'T LOGOUT BEFORE REVOKE (NEED TOKEN)
    // publish null user to user subscribers
    setUserStore({
      user: null,
      isLogged: false,
      didLogin: true,
      loggedOut: true,
    });

    // alert user
    alertService.signOutAlert(msg, options);

    // clear data
    clearCachedData();
  });

  // stop refresh timer
  stopRefreshTokenTimer();
};