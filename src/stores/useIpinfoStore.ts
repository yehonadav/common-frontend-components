import {CreateFetcher} from '../utils'
import createStore from 'zustand'
import {persist} from 'zustand/middleware'
import {useEffect} from "react";
import request from "axios";
import {appConfig} from '../variables';
import {getStorageCall} from '../utils';
import {clearDataService} from "../services/ClearData";

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
const fetchStore: any = {
  // [state[key]]: state => state[state[key]],
};

// state types
// https://ipinfo.io/developers/responses
type IpinfoType = undefined | {
  ip: string,
  hostname: string,
  city: string,
  region: string,
  country: string,
  loc: string,
  postal: string,
  timezone: string,
  asn: {
    asn: string,
    name: string,
    domain: string,
    route: string,
    type: string,
  },
  company: {
    name: string,
    domain: string,
    type: string,
  },
  carrier: {
    name: string,
    mcc: string,
    mnc: string,
  },
  privacy: {
    vpn: true,
    proxy: false,
    tor: false,
    hosting: false
  }
};

type State = {
  ipinfo: IpinfoType,
  country: string,
  loading: null | boolean,
}

// state initial values
const state: State = {
  // persist state
  ipinfo: undefined,
  country: "US",

  // non persist state
  loading: null,
};

// create state and update fetch function
const stateCreator = ():State => CreateFetcher(fetchStore, state);

// persist options
const persistOptions = {
  name: "useIpinfoStore",
  whitelist: ["ipinfo", "country"],
  getStorage: getStorageCall,
};

// data will persist even after logout
clearDataService.excludeLocalStorageItem(persistOptions.name);

// create store
// @ts-ignore
const useIpinfoStore = createStore<State>(persist(stateCreator, persistOptions));

// getters
const get = useIpinfoStore.getState;

// setters
const set = useIpinfoStore.setState;
const setIpinfoCountry = (iso2:string):void => set({country:iso2.toLowerCase()});

// hooks
const useIpinfo = ():IpinfoType => useIpinfoStore(fetchStore.ipinfo);
const useIpinfoCountry = ():string => useIpinfoStore(fetchStore.country);
const useIpinfoLoading = ():null|boolean => useIpinfoStore(fetchStore.loading);

// global hook
const useLoadIpinfo = ():void => {
  useEffect(() => {
    if (!get().ipinfo) {
      set({loading: true});
      request.get(`https://ipinfo.io/json?token=${appConfig.ipinfo_token}`)
        .then(resp => set(() => ({
          ipinfo: resp.data,
          country: resp.data.country ? resp.data.country : get().country,
        })))
        .catch(e => console.error('ipinfo error:', e))
        .finally(() => set({loading: false}));
    } else set({loading: false})
  }, [])
};

export {
  IpinfoType,
  fetchStore as fetchIpinfoStore,
  state as IpinfoStoreState,
  stateCreator as IpinfoStoreStateCreator,
  persistOptions as IpinfoStorePersistOptions,
  useIpinfoStore as useIpinfoStore,
  get as getIpinfoStore,
  set as setIpinfoStore,

  setIpinfoCountry,

  useIpinfo,
  useIpinfoCountry,
  useIpinfoLoading,

  useLoadIpinfo,
}