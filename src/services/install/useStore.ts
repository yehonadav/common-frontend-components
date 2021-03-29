import createStore from "zustand";
import {CreateFetcher} from '../../utils';

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
export const fetchInstallStore: any = {
  // [state[key]]: state => state[state[key]],
};

// create initial state and update fetchStore
export const stateCreatorInstallStore = () => CreateFetcher(fetchInstallStore, {
  open: false,
  clicked: false,
});

// create store (we recommend to use a unique const naming)
export const useInstallStore = createStore(
  // persist(
  //   persistConfig,
  stateCreatorInstallStore,
  // )
);

// create getters
export const getInstallStore = useInstallStore.getState;

// create setters
export const setInstallStore = useInstallStore.setState;
