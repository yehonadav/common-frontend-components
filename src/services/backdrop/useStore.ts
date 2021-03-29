import createStore from "zustand";
import {CreateFetcher} from '../../utils';

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
const fetchStore: any = {
  // [state[key]]: state => state[state[key]],
};

type State = {
  loading: boolean;
}

const state: State = {
  loading: false,
}

// stateCreatorInstallStore function
const stateCreator = ():State => CreateFetcher(fetchStore, {
  loading: false,
});

// store
const useStore = createStore<State>(stateCreator);

// getters
const get = useStore.getState;

// setters
const set = useStore.setState;

// actions
const setBackdrop = (loading:boolean):void => set({loading});

// hooks
const useBackdropIsLoading = ():boolean => useStore(fetchStore.loading);

export {
  fetchStore as fetchBackdropStore,
  State as TstateBackdropStore,
  state as stateBackdropStore,
  stateCreator as stateCreatorBackdropStore,
  useStore as useBackdropStore,
  get as getBackdropStore,
  set as setBackdropStore,

  setBackdrop,
  useBackdropIsLoading,
}
