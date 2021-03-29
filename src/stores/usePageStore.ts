import createStore from 'zustand'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import produce from 'immer'
import { CreateFetcher } from '../utils'
import { Function, Size } from '../types'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { appConfig } from '../variables'

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
const fetchStore: {[key:string]:(state:{[key:string]: any}) => any} = {
  // [state[key]]: state => state[state[key]],
};

type State = {
  // screen sizes
  width: number;
  height: number;
  size: Size;

  // page loaders
  page_loading: null | boolean;
  entered_page: null | boolean;

  // screen widths
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;

  // is it a mobile page version
  isMobile: boolean;

  // page style
  theme: null | Theme;
}

const state:State = {
  width: window.innerWidth,
  height: window.innerHeight,
  size: { width: window.innerWidth, height: window.innerHeight },

  page_loading: null,
  entered_page: null,

  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,

  isMobile: false,

  theme: null,
};

const useStore = createStore<State>(() => CreateFetcher(fetchStore, state));

// getters
const get = useStore.getState;
const getWidth = (): number => get().width;
const getHeight = (): number => get().height;
const getSize = (): Size => get().size;
const getPageLoading = (): null | boolean => get().page_loading;
const getEnteredPage = (): null | boolean => get().entered_page;
const getXS = (): boolean => get().xs;
const getSM = (): boolean => get().sm;
const getMD = (): boolean => get().md;
const getLG = (): boolean => get().lg;
const getXL = (): boolean => get().xl;
const getMobile = ():boolean => get().isMobile;
const getPageTheme = (): null | Theme => get().theme;

// setters
const set = useStore.setState;
const setImmer = (fn:Function):void => set(produce(fn));
const setPageLoading = (page_loading:boolean):void => set({page_loading});
const setEnteredPage = (entered_page:boolean):void => set({entered_page});

// actions
const updateWindowDimensions = ():void => setImmer((s: State)=>{
  const size = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  s.isMobile = size.width < appConfig.desktopMinWidth;
  s.width = size.width;
  s.height = size.height;
  s.size = size;
});

// hooks
const useWidth = (): number => useStore(fetchStore.width);
const useHeight = (): number => useStore(fetchStore.height);
const useSize = (): Size => useStore(fetchStore.size);
const usePageLoading = (): null | boolean => useStore(fetchStore.page_loading);
const useEnteredPage = (): null | boolean => useStore(fetchStore.entered_page);
const useXS = (): boolean => useStore(fetchStore.xs);
const useSM = (): boolean => useStore(fetchStore.sm);
const useMD = (): boolean => useStore(fetchStore.md);
const useLG = (): boolean => useStore(fetchStore.lg);
const useXL = (): boolean => useStore(fetchStore.xl);
const useMobile = (): boolean => useStore(fetchStore.isMobile);
const usePageTheme = (): null | Theme => useStore(fetchStore.theme);

// high order hooks
const useSizeListener = ():void => {
  useEffect(() => {
    // get window size on mount
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions); // unmount
  }, []);
};

const useScrollTransition = ():void => {
  useEffect(() => {
    setEnteredPage(true);
    window.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
  }, [useLocation().pathname]);
};

const useSizes = ():void => {
  const theme = useTheme();
  const xs: boolean = useMediaQuery(theme.breakpoints.down('xs'));
  const sm: boolean = useMediaQuery(theme.breakpoints.down('sm'));
  const md: boolean = useMediaQuery(theme.breakpoints.down('md'));
  const lg: boolean = useMediaQuery(theme.breakpoints.down('lg'));
  const xl: boolean = useMediaQuery(theme.breakpoints.down('xl'));
  useEffect(()=>{set({theme})},[theme]);
  useEffect(()=>{set({xs})},[xs]);
  useEffect(()=>{set({sm})},[sm]);
  useEffect(()=>{set({md})},[md]);
  useEffect(()=>{set({lg})},[lg]);
  useEffect(()=>{set({xl})},[xl]);
};

export {
  fetchStore as fetchPageStore,
  State as TPageStoreState,
  state as PageStoreState,
  useStore as usePageStore,
  get as getPageStore,
  set as setPageStore,
  setImmer as setImmerPageStore,

  getWidth,
  getHeight,
  getSize,
  getPageLoading,
  getEnteredPage,
  getXS,
  getSM,
  getMD,
  getLG,
  getXL,
  getMobile,
  getPageTheme,

  setPageLoading,
  setEnteredPage,

  updateWindowDimensions,

  useWidth,
  useHeight,
  useSize,
  usePageLoading,
  useEnteredPage,
  useXS,
  useSM,
  useMD,
  useLG,
  useXL,
  useMobile,
  usePageTheme,

  useSizeListener,
  useScrollTransition,
  useSizes,
}