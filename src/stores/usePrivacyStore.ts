import { useEffect } from "react";
import { isLocalStorageAvailable } from '../utils';
import { getStorageCall } from '@yehonadav/safestorage'
import { PersistOptions } from '../types'
import { createStorePersist } from '../utils/createStorePersist'

// state type
type State = {
  privacyPolicyAccepted: boolean,
  cookiesEnabled: null|boolean,
};

const persistOptions: PersistOptions<State> = {
  name: "usePrivacyStore",
  whitelist: ["privacyPolicyAccepted"],
  getStorage: getStorageCall,
};

const getDefaultValues = ():State => ({
  // persistent
  privacyPolicyAccepted: false,

  // none persistent
  cookiesEnabled: null,
});

const {
  fetchStore,
  useStore,
  get,
  set,
} = createStorePersist<State>({
  persistOptions,
  getDefaultValues,
  persistAfterClearingStorage: true,
});

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
  State as StatePrivacyStore,
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