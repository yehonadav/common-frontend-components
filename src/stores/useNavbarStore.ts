import { useEffect } from "react";
import { getSM } from './usePageStore'
import { useCollapseWidth } from '../hooks';
import { getStorageCall } from '@yehonadav/safestorage'
import { NullableBoolean, PersistOptions } from '../types'
import { createStorePersist } from '../utils/createStorePersist'

type State = {
  // persistent
  sidebar: boolean,
  sidebarDesktopClicked: NullableBoolean,
  sidebarMobileClicked: NullableBoolean,

  // none persistent
  sidebarMaxWidth: number,
  sidebarMinWidth: number,
  sidebarWidth: number,
  sidebarAnimaStyle: object,
}

// state initial values
const state: State = {
  // persistent
  sidebar: false,
  sidebarDesktopClicked: null,
  sidebarMobileClicked: null,

  // none persistent
  sidebarMaxWidth: 240,
  sidebarMinWidth: 0,
  sidebarWidth: 0,
  sidebarAnimaStyle: {from:{}},
};

const persistOptions: PersistOptions<State> = {
  name: "useNavbarStore",
  whitelist: [
    'sidebar',
    'sidebarDesktopClicked',
    'sidebarMobileClicked',
  ],
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

const setSidebar = (sidebar:boolean) => set({sidebar});

// actions
const toggleSidebar = () => set((s) => {
  const mobile = getSM();
  const update:any = {sidebar:!s.sidebar};
  
  if (mobile) 
    update.sidebarMobileClicked = update.sidebar;

  else 
    update.sidebarDesktopClicked = update.sidebar;
  
  return update
});

// hooks

// this is a global hook (it should stay global so init states and effects make sense)
const useSetSidebar = () => {
  const mobile = getSM()
  useEffect(()=>{
    const state = get();
    const click: null|boolean = mobile ? state.sidebarMobileClicked : state.sidebarDesktopClicked;

    setSidebar(click===null ? !mobile : click)
  }, [mobile]);
}

// this is a global hook (it should stay global so init states and effects make sense)
const useSidebarAnimate = () => {
  const sidebar: boolean = useStore(fetchStore.sidebar);
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
}

export {
  fetchStore as fetchNavbarStore,
  State as NavbarStoreState,
  state as navbarStoreState,
  persistOptions as navbarStorePersistOptions,
  useStore as useNavbarStore,
  get as getNavbarStore,
  set as setNavbarStore,

  setSidebar,
  toggleSidebar,
  useSetSidebar,
  useSidebarAnimate,
}