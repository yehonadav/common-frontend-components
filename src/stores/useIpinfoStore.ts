import {useEffect} from "react";
import {request} from '../api';
import {appConfig} from '../variables';
import { getStorageCall } from '@yehonadav/safestorage'
import { createStorePersist } from '../utils/createStorePersist'
import { PersistOptions } from '../types'

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

const state: State = {
  // persist state
  ipinfo: undefined,
  country: "US",

  // non persist state
  loading: null,
};

const persistOptions: PersistOptions<State> = {
  name: "useIpinfoStore",
  whitelist: ["ipinfo", "country"],
  getStorage: getStorageCall,
};

const {
  fetchStore,
  useStore,
  get,
  set,
} = createStorePersist<State>({
  persistOptions,
  getDefaultValues: () => state,
  persistAfterClearingStorage: true,
});

// setters
const setIpinfoCountry = (iso2:string):void => set({country:iso2.toLowerCase()});

// hooks
const useIpinfo = ():IpinfoType => useStore(fetchStore.ipinfo);
const useIpinfoCountry = ():string => useStore(fetchStore.country);
const useIpinfoLoading = ():null|boolean => useStore(fetchStore.loading);

// global hook
const useLoadIpinfo = ():void => {
  useEffect(() => {
    if (!get().ipinfo) {
      set({loading: true});
      request.get(`https://ipinfo.io/json?token=${appConfig.ipinfo_token}`)
        .then((data:any) => set(() => ({
          ipinfo: data,
          country: data.country ? data.country : get().country,
        })))
        .finally(() => set({loading: false}));
    } else set({loading: false})
  }, [])
};

export {
  IpinfoType,
  fetchStore as fetchIpinfoStore,
  state as IpinfoStoreState,
  persistOptions as ipinfoStorePersistOptions,
  useStore as useIpinfoStore,
  get as getIpinfoStore,
  set as setIpinfoStore,

  setIpinfoCountry,

  useIpinfo,
  useIpinfoCountry,
  useIpinfoLoading,

  useLoadIpinfo,
}