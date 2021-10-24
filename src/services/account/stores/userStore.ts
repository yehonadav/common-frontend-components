import produce from "immer";
import { NullableUser } from "../types";
import { NullableBoolean } from '../../../types'
import { createStore } from '../../../utils/createStore'
import { isStageLocal } from '../../../variables'
import { persistLocal } from '@yehonadav/safestorage'

type State = {
  // persistent
  // -

  // none persistent
  user: NullableUser,
  signin: boolean,

  idle: NullableBoolean,
  isLogged: NullableBoolean,
  didLogin: boolean,
  loggedOut: boolean,
  loading: NullableBoolean,
}

const state:State = {
  signin: false,
  user: null,

  idle: null,
  didLogin: false,
  isLogged: null,
  loading: null,
  loggedOut: false,
}

const {
  fetchStore,
  useStore,
  get,
  set,
} = createStore<State>({ getDefaultValues: () => state });

// create getters
const getSignin = (): boolean => get().signin;
const getUser = (): NullableUser => get().user;
const getIdle = (): NullableBoolean => get().idle;
const getDidLogin = (): boolean => get().didLogin;
const getIsLogged = (): NullableBoolean => get().isLogged;
const getUserLoading = (): NullableBoolean => get().loading;
const getLoggedOut = (): boolean => get().loggedOut;

// create setters
const setImmer = (fn: any) => set(produce(fn));

const _setUser = (user: NullableUser) => set({user});

const setUser = isStageLocal ? _setUser : (user: NullableUser) => {
  persistLocal.setItem('persistLocal-account', user);
  _setUser(user);
}

const setIdle = (idle: boolean) => set({idle});
const setSignin = (signin: boolean) => set({signin});
const setUserLoading = (loading: NullableBoolean) => set({loading});
const setIsLogged = (isLogged: NullableBoolean) => set({isLogged});
const setDidLogin = (didLogin: boolean) => set({didLogin});
const setLoggedOut = (loggedOut: boolean) => set({loggedOut});

export {
  fetchStore as fetchUserStore,
  State as StateUserStore,
  state as stateUserStore,
  useStore as useUserStore,

  get as getUserStore,
  getSignin,
  getUser,
  getIdle,
  getDidLogin,
  getIsLogged,
  getUserLoading,
  getLoggedOut,

  set as setUserStore,
  setImmer,
  setUser,
  setIdle,
  setSignin,
  setUserLoading,
  setIsLogged,
  setDidLogin,
  setLoggedOut,
}