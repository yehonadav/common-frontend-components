import createStore from 'zustand'
import {persist} from 'zustand/middleware'
import {CreateFetcher} from '../utils';
import React, {FC} from "react";
import {getStorageCall} from '../utils'
import {clearDataService} from "../services/ClearData";

type TtestAppsStoreOption = {
  label: string;
  Component: FC
}

const NoAppTestAppsStoreOption:TtestAppsStoreOption = {label: "NoApp", Component: ():null => null};

// state type
type State = {
  selectedApp: string,
};

const createTestAppsStore = (name:string, apps:Record<string, TtestAppsStoreOption>) => {
  const appsOptions = Object.values(apps)

  // state initial values
  const state: State = {
    selectedApp: apps.DevApp.label,
  };

  // improve performance by fetching state
  // from dynamically created functions
  // functions are created on store creation time
  const fetchApp: {[key:string]:(state:State) => any} = {
    // [state[key]]: state => state[state[key]],
  };

  // create state and update fetch function
  const stateCreator = ():State => CreateFetcher(fetchApp, state);

  // persist options
  const persistOptions = {
    name,
    whitelist: ["selectedApp"],
    getStorage: getStorageCall,
  };

  // data will persist even after logout
  clearDataService.excludeLocalStorageItem(persistOptions.name);

  // create store
  // @ts-ignore
  const useTestAppsStore = createStore(persist(stateCreator, persistOptions));

  // getters
  const get = useTestAppsStore.getState;

  // setters
  const set = useTestAppsStore.setState;
  const setSelectedApp = (selectedApp:string):void => set({selectedApp});

  // actions
  const onSelectApp = (event: React.ChangeEvent<{ value: unknown }>):void => {
    setSelectedApp(event.target.value as string);
  };

  // hooks
  const useCurrentlyTestedApp = ():TtestAppsStoreOption => {
    const selectedApp: string = useTestAppsStore(fetchApp.selectedApp);

    if (!apps[selectedApp])
      return NoAppTestAppsStoreOption;

    return apps[selectedApp];
  };

  return {
    appsOptions,
    state,
    fetchApp,
    stateCreator,
    persistOptions,
    useTestAppsStore,
    get,
    set,
    onSelectApp,
    useCurrentlyTestedApp,
  }
}

export {
  TtestAppsStoreOption,
  NoAppTestAppsStoreOption,
  State as TstateTestAppsStore,
  createTestAppsStore,
}