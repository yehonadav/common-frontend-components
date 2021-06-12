import createStore from 'zustand'
import { persist } from 'zustand/middleware'
import { createStoreFetchFunctions } from '../utils'
import { useEffect } from "react";
import { isLocalStorageAvailable } from '../utils';
import { clearDataService, getStorageCall } from '@yehonadav/safestorage'
import { PersistOptions } from '../types'

// state type
type State = {
  privacyPolicyAccepted: boolean,
  cookiesEnabled: null|boolean,
};

// state initial values
const state: State = {
  // persistent
  privacyPolicyAccepted: false,

  // none persistent
  cookiesEnabled: null,
};

const fetchStore = createStoreFetchFunctions<State>(state)

// persist options
const persistOptions:PersistOptions<State> = {
  name: "usePrivacyStore",
  whitelist: ["privacyPolicyAccepted"],
  getStorage: getStorageCall,
};

// data will persist even after logout
clearDataService.excludeLocalStorageItem(persistOptions.name);

// create store
const useStore = createStore(persist(() => state, persistOptions));

// getters
const get = useStore.getState;

// setters
const set = useStore.setState;

// actions
const areCookiesEnabled = () => {
  let cookieEnabled = navigator.cookieEnabled;
  if (!cookieEnabled){
    document.cookie = "areCookiesEnabled";
    cookieEnabled = document.cookie.indexOf("areCookiesEnabled")!=-1;
  }
  return cookieEnabled;
};

const onAcceptingPrivacyPolicy = () => set({privacyPolicyAccepted: true});

// hooks
const useCheckAreCookiesEnabled = () => {
  useEffect(()=>{
    set({cookiesEnabled: areCookiesEnabled() && isLocalStorageAvailable()})
  }, []);
};

const useCookiesEnabled = () => useStore(fetchStore.cookiesEnabled);
const usePrivacyPolicyAccepted = () => useStore(fetchStore.privacyPolicyAccepted);

export {
  State as TstatePrivacyStore,
  state as statePrivacyStore,
  fetchStore as fetchPrivacyStore,
  persistOptions as persistOptionsPrivacyStore,
  useStore as usePrivacyStore,
  get as getPrivacyStore,
  set as setPrivacyStore,

  areCookiesEnabled,
  onAcceptingPrivacyPolicy,

  useCheckAreCookiesEnabled,
  useCookiesEnabled,
  usePrivacyPolicyAccepted,
}