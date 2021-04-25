import produce from 'immer'
import createStore from 'zustand'
import {CreateFetcher} from '../utils';
import {persist} from 'zustand/middleware'
import {getStorageCall} from '../utils'
import {clearDataService} from "@yehonadav/safestorage";

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
const fetchStore: any = {
  // [state[key]]: state => state[state[key]],
};

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

// create state and update fetch function
const stateCreator = () => CreateFetcher(fetchStore, state);

// persist options
const persistOptions = {
  name: "useSidebarStore",
  whitelist: ["expanded"],
  getStorage: getStorageCall,
};

// data will persist even after logout
clearDataService.excludeLocalStorageItem(persistOptions.name);

// create store
// @ts-ignore
const useStore = createStore<State>(persist(stateCreator, persistOptions));

// getters
const get = useStore.getState;

// setters
const set = useStore.setState;
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
  State as TstateSidebarStore,
  state as stateSidebarStore,
  stateCreator as stateCreatorSidebarStore,
  persistOptions as persistOptionsSidebarStore,
  useStore as useSidebarStore,
  get as getSidebarStore,
  set as setSidebarStore,
  immer as setImmerSidebarStore,
  getRouteStore,
}