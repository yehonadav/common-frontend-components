import createStore from 'zustand'
import {persist} from 'zustand/middleware'
import {CreateFetcher} from "../utils/storeFetchFunctions";
import {getStorageCall} from '../utils/persist'
import produce from 'immer'
import {useEffect} from "react";
import { getSM } from './usePageStore'
import {useCollapseWidth} from "../hooks/useCollapseWidth";
import {clearDataService} from "../services/ClearData";


// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
export const fetchNavbar: {[key:string]:(state:{[key:string]: any}) => any} = {
  // [state[key]]: state => state[state[key]],
};


// persist options
export const persistOptions = {
  name: "useNavbarStore",
  whitelist: [
    'sidebar',
    'sidebarDesktopClicked',
    'sidebarMobileClicked',
  ],
  getStorage: getStorageCall,
};

// data will persist even after logout
clearDataService.excludeLocalStorageItem(persistOptions.name);

export const stateCreator: any = (set: any, get: any) =>
  CreateFetcher(fetchNavbar, {
    // persistent
    sidebar: false,
    sidebarDesktopClicked: null,
    sidebarMobileClicked: null,

    // none persistent
    sidebarMaxWidth: 240,
    sidebarMinWidth: 0,
    sidebarWidth: 0,
    sidebarAnimaStyle: {from:{}},

    // setters
    set: (fn: any) => set(produce(fn)),
    setState: set,

    set_sidebar: (sidebar:boolean) => set(()=>({sidebar})),

    // getters
    get,


    /////////////
    // actions //
    /////////////

    toggleSidebar: () => set((state: any)=>{
      const mobile = getSM()
      const update = {sidebar:!state.sidebar};
      // @ts-ignore
      if (mobile) update.sidebarMobileClicked = update.sidebar;
      // @ts-ignore
      else update.sidebarDesktopClicked = update.sidebar;
      return update
    }),

    ///////////
    // hooks //
    ///////////

    // this is a global hook (it should stay global so init states and effects make sense)
    useSetSidebar: () => {
      const mobile = getSM()
      useEffect(()=>{
        const state = get();
        const click: null|boolean = mobile ? state.sidebarMobileClicked : state.sidebarDesktopClicked;

        state.set_sidebar(click===null ? !mobile : click)
      }, [mobile]);
    },

    // this is a global hook (it should stay global so init states and effects make sense)
    useSidebarAnimate: () => {
      // @ts-ignore
      const sidebar: boolean = useNavbarStore(fetchStore.sidebar);
      const state = get();

      const {style, animaStyle} = useCollapseWidth({
        width: state.sidebarMaxWidth,
        open: sidebar,
        closeWidth: state.sidebarMinWidth,
      });

      useEffect(()=>{set(()=>({
        // @ts-ignore
        sidebarWidth: style.width,
        sidebarAnimaStyle: animaStyle,
      }))}, [style, animaStyle]);
    },

});

export const useNavbarStore = createStore(
  persist(
    stateCreator,
    persistOptions
  )
);
