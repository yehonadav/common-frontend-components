import createStore from 'zustand'
import {CreateFetcher} from "../utils/storeFetchFunctions";
import {persist} from 'zustand/middleware'
import {getStorageCall} from "../utils/persist"
import produce from 'immer'
import {clearDataService} from "../services/ClearData";

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
export const fetchSidebar: any = {
  // [state[key]]: state => state[state[key]],
};

// state type
export type State = {
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
export const state: State = {
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
export const stateCreator = () => CreateFetcher(fetchSidebar, state);

// persist options
export const persistOptions = {
  name: "useSidebarStore",
  whitelist: ["expanded"],
  getStorage: getStorageCall,
};

// data will persist even after logout
clearDataService.excludeLocalStorageItem(persistOptions.name);

// create store
// @ts-ignore
export const useSidebarStore = createStore<State>(persist(stateCreator, persistOptions));

// getters
export const get = useSidebarStore.getState;

// setters
export const set = useSidebarStore.setState;
export const immer = (fn:(s:State)=>void):void => set(produce(fn));

// actions
export const getRouteStore = (route: string) => {
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
