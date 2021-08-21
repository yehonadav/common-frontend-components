import produce from 'immer'
import { getStorageCall } from '@yehonadav/safestorage'
import { createStorePersist } from '../utils/createStorePersist'
import { PersistOptions } from '../types'

type SidebarState = {
  open: boolean;
  expanded: {[x: string]: boolean};
  routes: {
    [x: string]: {
      expanded: boolean;
      open: () => void;
      close: () => void;
      toggle: () => void;
    };
  };
};

// state initial values
const defaultState: SidebarState = {
  // persistent
  open: false,
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

export interface ICreateSidebarStore {
  state?: SidebarState;
  name: string;
}

export const createSidebarStore = ({ name, state=defaultState }:ICreateSidebarStore) => {
  const persistOptions: PersistOptions<SidebarState> = {
    name,
    whitelist: ['expanded', 'open'],
    getStorage: getStorageCall,
  };

  const {
    fetchStore,
    useStore,
    get,
    set,
  } = createStorePersist<SidebarState>({
    persistOptions,
    getDefaultValues: () => state,
    persistAfterClearingStorage: true,
  });

  const immer = (fn:(s:SidebarState)=>void):void => set(produce(fn));

  // actions
  const getRouteStore = (route: string) => {
    const state = get();

    if (state.expanded[route] === undefined || state.routes[route] === undefined) {
      const route_store = {
        expanded: state.expanded[route] === undefined ? false : state.expanded[route],
        open: () => immer((s:SidebarState) => {
          s.expanded[route] = true;
          s.routes[route].expanded = s.expanded[route];
        }),
        close: () => immer((s:SidebarState) => {
          s.expanded[route] = false;
          s.routes[route].expanded = s.expanded[route];
        }),
        toggle: () => immer((s:SidebarState) => {
          s.expanded[route] = !s.expanded[route];
          s.routes[route].expanded = s.expanded[route];
        }),
      };
      immer((s:SidebarState) => {
        if (s.expanded[route] === undefined)
          s.expanded[route] = route_store.expanded;
        s.routes[route] = route_store
      });
      return route_store;
    }
    return state.routes[route];
  };

  const getOpen = ():boolean => get().open;
  const setOpen = (open:boolean):void => set({open});
  const setOpenTrue = ():void => setOpen(true);
  const setOpenFalse = ():void => setOpen(false);
  const toggleOpen = ():void => setOpen(!getOpen());
  const useOpen = ():boolean => useStore(fetchStore.open);

  return {
    fetchStore,
    useStore,
    get,
    set,
    immer,
    getRouteStore,
    getOpen,
    setOpen,
    setOpenTrue,
    setOpenFalse,
    toggleOpen,
    useOpen,
  }
}

export const sidebarStore = createSidebarStore({ name: 'common-frontend-components/services/sidebar'});