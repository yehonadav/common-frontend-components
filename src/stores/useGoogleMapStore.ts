import createStore from 'zustand'
import {CreateFetcher} from '../utils';
import produce from 'immer'
import {useEffect} from "react";
import {useLoadScript} from "@react-google-maps/api"
import {appConfig} from '../variables'
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url'

const libraries:Libraries = ["places"];

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
const fetchStore = {
  // [state[key]]: state => state[state[key]],
};

// state type
type State = {
  isLoaded: null|boolean,
  loadError: Error|undefined,
};

// state initial values
const state: State = {
  isLoaded: null,
  loadError: undefined,
};

// create state and update fetch function
const stateCreator = () => CreateFetcher(fetchStore, state);

// create store
const useStore = createStore<State>(stateCreator);

// getters
const get = useStore.getState;

// setters
const set = useStore.setState;
const setImmer = (fn: any) => set(produce(fn));

// hooks

// this is a global hook
const useLoadGoogleMaps = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: appConfig.google_maps_key||"",
    libraries,
  });

  useEffect(()=>{
    if (loadError)
      console.error('loaded_google_maps useLoadScript Error', loadError);

    set({isLoaded, loadError})
  },[isLoaded, loadError]);
}

export {
  fetchStore as fetchGoogleMapStore,
  state as GoogleMapStoreState,
  stateCreator as GoogleMapStoreStateCreator,
  useStore as useGoogleMapStore,
  get as getGoogleMapStore,
  set as setGoogleMapStore,
  setImmer as setImmerGoogleMapStore,
  useLoadGoogleMaps,
}