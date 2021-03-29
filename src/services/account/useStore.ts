import createStore from "zustand";
import {CreateFetcher} from '../../utils';
import produce from "immer";
import { NullableUser } from "./types";
import { NullableBoolean } from '../../types'

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
const fetchStore: any = {
  // [state[key]]: state => state[state[key]],
};

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

// create initial state and update fetchStore
const stateCreator = () => CreateFetcher(fetchStore, state);

// create store (we recommend to use a unique const naming)
const useStore = createStore<State>(stateCreator);

// create getters
const get = useStore.getState;
const getSignin = (): boolean => get().signin;
const getUser = (): NullableUser => get().user;
const getIdle = (): NullableBoolean => get().idle;
const getDidLogin = (): boolean => get().didLogin;
const getIsLogged = (): NullableBoolean => get().isLogged;
const getUserLoading = (): NullableBoolean => get().loading;
const getLoggedOut = (): boolean => get().loggedOut;

// create setters
const set = useStore.setState;
const setImmer = (fn: any) => set(produce(fn));
const setUser  = (user: NullableUser) => set({user});
const setIdle = (idle: boolean) => set({idle});
const setSignin = (signin: boolean) => set({signin});
const setUserLoading = (loading: NullableBoolean) => set({loading});
const setIsLogged = (isLogged: NullableBoolean) => set({isLogged});
const setDidLogin = (didLogin: boolean) => set({didLogin});
const setLoggedOut = (loggedOut: boolean) => set({loggedOut});

export {
  fetchStore as fetchUserStore,
  State as TstateUserStore,
  state as stateUserStore,
  stateCreator as stateCreatorUserStore,
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