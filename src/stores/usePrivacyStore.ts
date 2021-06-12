import createStore from 'zustand'
import {persist} from 'zustand/middleware'
import {CreateFetcher} from '../utils';
import {useEffect} from "react";
import {isLocalStorageAvailable} from '../utils';
import { clearDataService, getStorageCall } from '@yehonadav/safestorage'

// state type
type State = {
  privacyPolicyAccepted: boolean,
  cookiesEnabled: null|boolean,
};

// persist options
const persistOptions = {
  name: "usePrivacyStore",
  whitelist: ["privacyPolicyAccepted"],
  getStorage: getStorageCall,
};

// state initial values
const state: State = {
  // persistent
  privacyPolicyAccepted: false,

  // none persistent
  cookiesEnabled: null,
};

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
const fetchStore: {[key:string]:(state:{[key:string]: any}) => any} = {
  // [state[key]]: state => state[state[key]],
};

// create state and update fetch function
const stateCreator = () => CreateFetcher(fetchStore, state);

// data will persist even after logout
clearDataService.excludeLocalStorageItem(persistOptions.name);

// create store
// @ts-ignore
const useStore = createStore(persist(stateCreator, persistOptions));

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

const useCookiesEnabled = ():null|boolean => useStore(fetchStore.cookiesEnabled);
const usePrivacyPolicyAccepted = ():boolean => useStore(fetchStore.privacyPolicyAccepted);

export {
  State as TstatePrivacyStore,
  state as statePrivacyStore,
  fetchStore as fetchPrivacyStore,
  stateCreator as stateCreatorPrivacyStore,
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