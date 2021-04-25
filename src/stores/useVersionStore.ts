import createStore from 'zustand'
import { CreateFetcher, links } from '../utils'
import {persist} from 'zustand/middleware'
import {getStorageCall} from '../utils'
import {useOnLoad} from '../hooks';
import {request} from '../api';
import {appConfig} from '../variables';
import {clearDataService, clearCachedData} from "@yehonadav/safestorage";
import { alertService, setBackdrop } from '../services'
import { NullableString } from '../types'

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
const fetchStore: any = {
  // [state[key]]: state => state[state[key]],
};

// state type
type State = {
  version: NullableString,
};

// state initial values
const state: State = {
  version: null,
};

// create state and update fetch function
const stateCreator = () => CreateFetcher(fetchStore, state);

// persist options
const persistOptions = {
  name: "useVersionStore",
  whitelist: ["version"],
  getStorage: getStorageCall,
};

// data will persist even after logout
clearDataService.excludeLocalStorageItem(persistOptions.name);

// create store
// @ts-ignore
const useStore = createStore<State>(persist(stateCreator, persistOptions));

// getters
const get = useStore.getState;

// setters
const set = useStore.setState;

// actions
const getVersion = () => get().version;

const setVersion = (version:NullableString) => set({version});

const getVersionDate = (version:NullableString):Date|void => {
  if (version) {
    const versionParsed = version.split(".").map(i => parseInt(i));
    // @ts-ignore
    return new Date(...versionParsed);
  }
};

// hooks
const useVersion = ():NullableString => useStore(fetchStore.version);

// global hook
const useUpdateVersion = () => {
  useOnLoad(()=>{
    const currentVersion = getVersionDate(get().version);
    console.log("currentVersion", currentVersion);

    request.get(appConfig.versionUrl||"")
      .then((responseDate: { version: NullableString; }) => {
        const latestVersion = getVersionDate(responseDate.version);

        console.log("latestVersion", latestVersion);

        if (!latestVersion)
          throw "failed to parse latest version";

        else if (!currentVersion)
          setVersion(responseDate.version);

        else if (currentVersion < latestVersion) {
          alertService.info("loading a new version", {timeout: 6000})
          setBackdrop(true);
          clearCachedData()
            .then(() => {
              setVersion(responseDate.version);
              links.refresh();
            })
            .catch((e) => alertService.error({'failed to load new version': e}))
            .finally(() => {setBackdrop(false)});
        }
      })
  });
};

export {
  fetchStore as fetchVersionStore,
  State as TstateVersionStore,
  state as stateVersionStore,
  stateCreator as stateCreatorVersionStore,
  persistOptions as persistOptionsVersionStore,
  useStore as useVersionStore,
  get as getVersionStore,
  set as setVersionStore,

  getVersion,
  setVersion,

  getVersionDate,

  useVersion,
  useUpdateVersion,
}