import GA4React from 'ga-4-react'
import { GA4ReactResolveInterface } from 'ga-4-react/src/models/gtagModels'
import { createStore } from '../utils/createStore'

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

const {
  fetchStore,
  useStore,
  get,
  set,
} = createStore<State>({ getDefaultValues: () => state });

// getters
const getIsGA4Initialized = ():boolean => get().initialized;
const getGa4react = ():GA4React|undefined => get().ga4react;
const getGA4 = ():GA4ReactResolveInterface|undefined => get().ga4;

// setters
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