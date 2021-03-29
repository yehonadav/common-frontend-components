import {links} from '../../utils';
import {_logout, handleLogin} from './helpers'
import {getUser, setUserStore, setSignin, setUser} from './useStore'
import * as api from './api'
import {User} from "./types";

export const signInOpen = () =>
  setSignin(true);

export const signInClose = () =>
  setSignin(false);

export const login = (email: string, password: string, recaptcha: string) => {
  setUserStore({loading: true});
  return api.call_login({email, password, recaptcha})
    .then((user: any) => handleLogin(user))
    .finally(() => setUserStore({loading: false}));
};

export const login_with_google = (token: string) => {
  setUserStore({loading: true});
  return api.call_login_google({token})
    .then((user: any) => handleLogin(user))
    .finally(() => setUserStore({loading: false}));
};

export const refreshToken = async () => {
  // TODO: on failure: session_timed_out
  setUserStore({loading: true});
  try {
    const user = await api.call_refresh();
    handleLogin(user);
  }
  catch (e) {
    setUserStore({isLogged: false});
    throw e
  }
  finally {
    setUserStore({loading: false});
  }
};

export const logout_if_logged = ():void => {
  if (getUser())
    _logout();
};

export const logout = ():void => {
  _logout();
  // redirect to login page
  links.go_to_signin();
};

export const update = (id: string, params: Record<string, unknown>):Promise<any> =>
  api.call_update(id, params)
    .then((data: User) => {
      // update stored user if the logged in user updated their own record
      const user = getUser();
      if (user && data.id === user.id) {
        // publish updated user to subscribers
        data = {...getUser(), ...data};
        setUser(data);
      }
      return data;
    });

export const update_avatar = (id: string, file: Blob):Promise<User> =>
  api.call_update_avatar(id, file)
    .then((userResponse: User) => {
      // update stored user if the logged in user updated their own record
      const user = getUser();
      if (user && userResponse.id === user.id) {
        // publish updated user to subscribers
        userResponse = {...user, ...userResponse};
        setUser(userResponse);
      }
      return userResponse;
    });

// prefixed with underscore because 'delete' is a reserved word in javascript
export const remove = (id: string):Promise<any> =>
  api.call_remove(id)
    .then((x: any) => {
      // auto logout if the logged in user deleted their own record
      const user = getUser();
      if (user && id === user.id) {
        logout();
      }
      return x;
    });

