import createStore from 'zustand'
import {CreateFetcher} from '../utils';

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
const fetchStore: any = {
  // [state[key]]: state => state[state[key]],
};

// state type
type State = {
  footerHeight: number,
};

// state initial values
const state: State = {
  footerHeight: 0,
};

// create state and update fetch function
const stateCreator = () => CreateFetcher(fetchStore, state);

// create store
const useStore = createStore<State>(stateCreator);

// getters
const get = useStore.getState;

// setters
const set = useStore.setState;

// actions
const getFooterHeight = () => get().footerHeight;

// hooks
const useFooterHeight = ():number => useStore(fetchStore.footerHeight);

export {
  fetchStore as fetchFooterHeightStore,
  State as TfooterHeightStoreState,
  state as footerHeightStoreState,
  stateCreator as footerHeightStoreStateCreator,
  useStore as useFooterHeightStore,
  get as getFooterHeightStore,
  set as setFooterHeightStore,

  getFooterHeight,
  useFooterHeight,
}