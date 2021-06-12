import produce from 'immer'
import {useEffect} from "react";
import {useLoadScript} from "@react-google-maps/api"
import {appConfig} from '../variables'
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url'
import { createStore } from '../utils/createStore'

const libraries:Libraries = ["places"];

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

const {
  fetchStore,
  useStore,
  get,
  set,
} = createStore<State>({ getDefaultValues: () => state });

// setters
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
  useStore as useGoogleMapStore,
  get as getGoogleMapStore,
  set as setGoogleMapStore,
  setImmer as setImmerGoogleMapStore,
  useLoadGoogleMaps,
}