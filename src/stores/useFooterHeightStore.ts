import { createStore } from '../utils/createStore'

type State = {
  footerHeight: number,
};

const state: State = {
  footerHeight: 0,
};

const {
  fetchStore,
  useStore,
  get,
  set,
} = createStore<State>({ getDefaultValues: () => state });

// actions
const getFooterHeight = () => get().footerHeight;

// hooks
const useFooterHeight = ():number => useStore(fetchStore.footerHeight);

export {
  fetchStore as fetchFooterHeightStore,
  State as FooterHeightStoreState,
  state as footerHeightStoreState,
  useStore as useFooterHeightStore,
  get as getFooterHeightStore,
  set as setFooterHeightStore,

  getFooterHeight,
  useFooterHeight,
}