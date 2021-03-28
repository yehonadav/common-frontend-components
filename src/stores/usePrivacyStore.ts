import createStore from 'zustand'
import {persist} from 'zustand/middleware'
import {CreateFetcher} from "../utils/storeFetchFunctions";
import {useEffect} from "react";
import {getStorageCall} from "../utils/persist"
import {isLocalStorageAvailable} from "../utils/isLocalStorageAvailable";
import {clearDataService} from "../services/ClearData";

// state type
export type State = {
  privacyPolicyAccepted: boolean,
  cookiesEnabled: null|boolean,
};

// state initial values
export const state: State = {
  // persistent
  privacyPolicyAccepted: false,

  // none persistent
  cookiesEnabled: null,
};

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
export const fetchPrivacy: {[key:string]:(state:{[key:string]: any}) => any} = {
  // [state[key]]: state => state[state[key]],
};

// create state and update fetch function
export const stateCreator = () => CreateFetcher(fetchPrivacy, state);

// persist options
export const persistOptions = {
  name: "usePrivacyStore",
  whitelist: ["privacyPolicyAccepted"],
  getStorage: getStorageCall,
};

// data will persist even after logout
clearDataService.excludeLocalStorageItem(persistOptions.name);

// create store
// @ts-ignore
export const usePrivacyStore = createStore(persist(stateCreator, persistOptions));

// getters
export const get = usePrivacyStore.getState;

// setters
export const set = usePrivacyStore.setState;

// actions
export const areCookiesEnabled = () => {
  let cookieEnabled = navigator.cookieEnabled;
  if (!cookieEnabled){
    document.cookie = "areCookiesEnabled";
    cookieEnabled = document.cookie.indexOf("areCookiesEnabled")!=-1;
  }
  return cookieEnabled;
};

export const onAcceptingPrivacyPolicy = () => set({privacyPolicyAccepted: true});

// hooks
export const useCheckAreCookiesEnabled = () => {
  useEffect(()=>{
    set({cookiesEnabled: areCookiesEnabled() && isLocalStorageAvailable()})
  }, []);
};

export const useCookiesEnabled = ():null|boolean => usePrivacyStore(fetchPrivacy.cookiesEnabled);
export const usePrivacyPolicyAccepted = ():boolean => usePrivacyStore(fetchPrivacy.privacyPolicyAccepted);
