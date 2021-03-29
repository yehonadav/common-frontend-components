import createStore from "zustand";
import {CreateFetcher} from '../../utils';

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
export const fetchBackdrop: any = {
  // [state[key]]: state => state[state[key]],
};

export type State = {
  loading: boolean;
}

export const state: State = {
  loading: false,
}

// stateCreatorInstallStore function
export const stateCreator = ():State => CreateFetcher(fetchBackdrop, {
  loading: false,
});

// store
export const useBackdropStore = createStore<State>(stateCreator);

// getters
export const get = useBackdropStore.getState;

// setters
export const set = useBackdropStore.setState;

// actions
export const setBackdrop = (loading:boolean):void => set({loading});

// hooks
export const useBackdropIsLoading = ():boolean => useBackdropStore(fetchBackdrop.loading);
