import { createStore } from '../../utils/createStore'

type State = {
  loading: boolean;
}

const state: State = {
  loading: false,
}

const {
  fetchStore,
  useStore,
  get,
  set,
} = createStore<State>({ getDefaultValues: () => state });

// actions
const setBackdrop = (loading:boolean):void => set({loading});

// hooks
const useBackdropIsLoading = ():boolean => useStore(fetchStore.loading);

export {
  fetchStore as fetchBackdropStore,
  State as StateBackdropStore,
  state as stateBackdropStore,
  useStore as useBackdropStore,
  get as getBackdropStore,
  set as setBackdropStore,

  setBackdrop,
  useBackdropIsLoading,
}
