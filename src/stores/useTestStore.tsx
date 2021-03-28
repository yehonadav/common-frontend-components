import createStore from 'zustand'
import {persist} from 'zustand/middleware'
import {CreateFetcher} from "../utils/storeFetchFunctions";
import React, {FC} from "react";
import {getStorageCall} from "../utils/persist"
import {clearDataService} from "../services/ClearData";
import {AdminApp} from '../apps/AdminApp'
import {EmployeesApp} from '../apps/EmployeesApp'
import {GuestsApp} from '../apps/GuestsApp'
import {HotelsApp} from '../apps/HotelsApp'
import {DevApp} from '../apps/DevApp'
import {WwwApp} from '../apps/WwwApp'

export type AppOptionType = {
  label: string;
  Component: FC
}

export const NoApp:AppOptionType = {label: "NoApp", Component: ():null => null};

export const apps:Record<string, AppOptionType> = {
  AdminApp: {label: "AdminApp", Component: AdminApp},
  EmployeesApp: {label: "EmployeesApp", Component: EmployeesApp},
  GuestsApp: {label: "GuestsApp", Component: GuestsApp},
  HotelsApp: {label: "HotelsApp", Component: HotelsApp},
  DevApp: {label: "DevApp", Component: DevApp},
  WwwApp: {label: "WwwApp", Component: WwwApp},
}

export const appsOptions = Object.values(apps);

// state type
export type State = {
  selectedApp: string,
};

// state initial values
export const state: State = {
  selectedApp: apps.DevApp.label,
};

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
export const fetchApp: {[key:string]:(state:State) => any} = {
  // [state[key]]: state => state[state[key]],
};

// create state and update fetch function
export const stateCreator = ():State => CreateFetcher(fetchApp, state);

// persist options
export const persistOptions = {
  name: "useTestStore",
  whitelist: ["selectedApp"],
  getStorage: getStorageCall,
};

// data will persist even after logout
clearDataService.excludeLocalStorageItem(persistOptions.name);

// create store
// @ts-ignore
export const useTestStore = createStore(persist(stateCreator, persistOptions));

// getters
export const get = useTestStore.getState;

// setters
export const set = useTestStore.setState;
export const setSelectedApp = (selectedApp:string):void => set({selectedApp});

// actions
export const onSelectApp = (event: React.ChangeEvent<{ value: unknown }>):void => {
  setSelectedApp(event.target.value as string);
};

// hooks
export const useCurrentlyTestedApp = ():AppOptionType => {
  const selectedApp: string = useTestStore(fetchApp.selectedApp);

  if (!apps[selectedApp])
    return NoApp;

  return apps[selectedApp];
};
