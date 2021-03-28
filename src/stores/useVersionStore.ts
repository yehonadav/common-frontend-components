import createStore from 'zustand'
import {CreateFetcher} from "../utils/storeFetchFunctions";
import {persist} from 'zustand/middleware'
import {getStorageCall} from "../utils/persist"
import {useOnLoad} from "../hooks/useOnLoad";
import {request} from "../api/request";
import {appConfig} from "../variables/appConfig";
import {accountService} from "../services/account/service";
import {clearDataService} from "../services/ClearData";

const baseUrl = `${appConfig.apiUrl}/version`;

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
export const fetchVersion: any = {
  // [state[key]]: state => state[state[key]],
};

export type VersionType = null | string;

// state type
export type State = {
  version: VersionType,
};

// state initial values
export const state: State = {
  version: null,
};

// create state and update fetch function
export const stateCreator = () => CreateFetcher(fetchVersion, state);

// persist options
export const persistOptions = {
  name: "useVersionStore",
  whitelist: ["version"],
  getStorage: getStorageCall,
};

// data will persist even after logout
clearDataService.excludeLocalStorageItem(persistOptions.name);

// create store
// @ts-ignore
export const useVersionStore = createStore<State>(persist(stateCreator, persistOptions));

// getters
export const get = useVersionStore.getState;

// setters
export const set = useVersionStore.setState;

// actions
export const getVersion = () => get().version;

export const setVersion = (version:VersionType) => set({version});

export const getVersionDate = (version:VersionType) => {
  if (version) {
    const versionParsed = version.split(".").map(i => parseInt(i));
    // @ts-ignore
    return new Date(...versionParsed);
  }
};

// hooks
export const useVersion = ():VersionType => useVersionStore(fetchVersion.version);

// global hook
export const useUpdateVersion = () => {
  useOnLoad(()=>{
    const currentVersion = getVersionDate(get().version);
    console.log("currentVersion", currentVersion);

    request.get(baseUrl)
      .then((responseDate) => {
        const latestVersion = getVersionDate(responseDate.version);

        console.log("latestVersion", latestVersion);

        if (!latestVersion)
          throw "failed to parse latest version";

        else if (!currentVersion)
          setVersion(responseDate.version);

        else if (currentVersion < latestVersion) {
          accountService.logout();
          setVersion(responseDate.version);
          // logout will probably delete
          // latestVersion from storage
          // but null case will be handled
          // in the next onLoad
        }
      })
  });
};