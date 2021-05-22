import createStore from 'zustand'
import {CreateFetcher} from '../utils';
import GA4React from 'ga-4-react'
import { GA4ReactResolveInterface } from 'ga-4-react/src/models/gtagModels'

// state type
type State = {
  initialized:boolean;
  ga4react:GA4React|undefined;
  ga4:GA4ReactResolveInterface|undefined;
};

// state initial values
const state: State = {
  initialized:false,
  ga4react:undefined,
  ga4:undefined,
};

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
const fetchStore: {[key:string]:(state:{[key:string]: any}) => any} = {
  // [state[key]]: state => state[state[key]],
};

// create state and update fetch function
const stateCreator = () => CreateFetcher(fetchStore, state);

// create store
const useStore = createStore(stateCreator);

// getters
const get = useStore.getState;
const getIsGA4Initialized = ():boolean => get().initialized;
const getGa4react = ():GA4React|undefined => get().ga4react;
const getGA4 = ():GA4ReactResolveInterface|undefined => get().ga4;

// setters
const set = useStore.setState;
const setIsGA4Initialized = (initialized:boolean):void => set({initialized});
const setGa4React = (ga4react:GA4React):void => set({ga4react});
const setGA4 = (ga4:GA4ReactResolveInterface):void => set({ga4});

// hooks
const useIsGA4Initialized = ():boolean => useStore(fetchStore.initialized);
const useGa4react = ():GA4React|undefined => useStore(fetchStore.ga4react);
const useGA4 = ():GA4ReactResolveInterface|undefined => useStore(fetchStore.ga4);

export {
  State as StateGA4Store,
  useStore as useGA4Store,

  get as getGA4Store,
  getIsGA4Initialized,
  getGa4react,
  getGA4,

  set as setGA4Store,
  setIsGA4Initialized,
  setGa4React,
  setGA4,

  useIsGA4Initialized,
  useGa4react,
  useGA4,
}