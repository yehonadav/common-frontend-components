import produce from 'immer'
import { getStorageCall } from '@yehonadav/safestorage'
import { createStorePersist } from '../utils/createStorePersist'
import { PersistOptions } from '../types'

// state type
type State = {
  expanded: {[x: string]: boolean},
  routes: {
    [x: string]: {
      expanded: boolean,
      open: () => void,
      close: () => void,
      toggle: () => void,
    }
  },
};

// state initial values
const state: State = {
  // persistent
  expanded: {
    // [route]: bool
  },

  // none persistent
  routes: {
    // [route]: {
    //   expanded: boolean,
    //   open: Function,
    //   close: Function,
    //   toggle: Function,
    // }
  },
};

// persist options
const persistOptions: PersistOptions<State> = {
  name: "useSidebarStore",
  whitelist: ["expanded"],
  getStorage: getStorageCall,
};

const {
  fetchStore,
  useStore,
  get,
  set,
} = createStorePersist<State>({
  persistOptions,
  getDefaultValues: () => state,
  persistAfterClearingStorage: true,
});

const immer = (fn:(s:State)=>void):void => set(produce(fn));

// actions
const getRouteStore = (route: string) => {
  const state = get();

  if (state.expanded[route] === undefined || state.routes[route] === undefined) {
    const route_store = {
      expanded: state.expanded[route] === undefined ? false : state.expanded[route],
      open: () => immer((s:State) => {
        s.expanded[route] = true;
        s.routes[route].expanded = s.expanded[route];
      }),
      close: () => immer((s:State) => {
        s.expanded[route] = false;
        s.routes[route].expanded = s.expanded[route];
      }),
      toggle: () => immer((s:State) => {
        s.expanded[route] = !s.expanded[route];
        s.routes[route].expanded = s.expanded[route];
      }),
    };
    immer((s:State) => {
      if (s.expanded[route] === undefined)
        s.expanded[route] = route_store.expanded;
      s.routes[route] = route_store
    });
    return route_store;
  }
  return state.routes[route];
};

export {
  fetchStore as fetchSidebarStore,
  State as StateSidebarStore,
  state as stateSidebarStore,
  persistOptions as persistOptionsSidebarStore,
  useStore as useSidebarStore,
  get as getSidebarStore,
  set as setSidebarStore,
  immer as setImmerSidebarStore,
  getRouteStore,
}