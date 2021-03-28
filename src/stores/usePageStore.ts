import createStore from 'zustand'
import {CreateFetcher} from "../utils/storeFetchFunctions";
import produce from 'immer'
import {Function} from "../types";
import {useEffect} from "react";
import {useLocation} from 'react-router-dom'
import {useTheme} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import {Theme} from "@material-ui/core/styles/createMuiTheme";

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
export const fetchPage: {[key:string]:(state:{[key:string]: any}) => any} = {
  // [state[key]]: state => state[state[key]],
};

export declare type Size = {width: number, height: number};

export type State = {
  // screen sizes
  width: number;
  height: number;
  size: Size;

  // page loaders
  page_loading: null | boolean;
  entered_page: null | boolean;
  backdrop: boolean;

  // screen widths
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;

  // page style
  theme: null | Theme;
}

export const usePageStore = createStore<State>(() =>
  CreateFetcher(fetchPage, {
    width: window.innerWidth,
    height: window.innerHeight,
    size: { width: window.innerWidth, height: window.innerHeight },

    page_loading: null,
    entered_page: null,
    backdrop: false,

    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,

    theme: null,
}));

// getters
export const get = usePageStore.getState;
export const getWidth = (): number => get().width;
export const getHeight = (): number => get().height;
export const getSize = (): Size => get().size;
export const getPageLoading = (): null | boolean => get().page_loading;
export const getEnteredPage = (): null | boolean => get().entered_page;
export const getBackdrop = (): boolean => get().backdrop;
export const getXS = (): boolean => get().xs;
export const getSM = (): boolean => get().sm;
export const getMD = (): boolean => get().md;
export const getLG = (): boolean => get().lg;
export const getXL = (): boolean => get().xl;
export const getPageTheme = (): null | Theme => get().theme;

// setters
export const set = usePageStore.setState;
export const setImmer = (fn:Function):void => set(produce(fn));
export const set_page_loading = (page_loading:boolean):void => set({page_loading});
export const set_entered_page = (entered_page:boolean):void => set({entered_page});
export const set_backdrop = (backdrop:boolean):void => set({backdrop});

// actions
export const updateWindowDimensions = ():void => setImmer((s: State)=>{
  s.width=window.innerWidth;
  s.height=window.innerHeight;
  s.size={width: window.innerWidth, height: window.innerHeight};
});

// hooks
export const useWidth = (): number => usePageStore(fetchPage.width);
export const useHeight = (): number => usePageStore(fetchPage.height);
export const useSize = (): Size => usePageStore(fetchPage.size);
export const usePageLoading = (): null | boolean => usePageStore(fetchPage.page_loading);
export const useEnteredPage = (): null | boolean => usePageStore(fetchPage.entered_page);
export const useBackdrop = (): boolean => usePageStore(fetchPage.backdrop);
export const useXS = (): boolean => usePageStore(fetchPage.xs);
export const useSM = (): boolean => usePageStore(fetchPage.sm);
export const useMD = (): boolean => usePageStore(fetchPage.md);
export const useLG = (): boolean => usePageStore(fetchPage.lg);
export const useXL = (): boolean => usePageStore(fetchPage.xl);
export const usePageTheme = (): null | Theme => usePageStore(fetchPage.theme);

// high order hooks
export const useSizeListener = ():void => {
  useEffect(() => {
    // get window size on mount
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions); // unmount
  }, []);
};

export const useScrollTransition = ():void => {
  useEffect(() => {
    set_entered_page(true);
    window.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
    set_backdrop(false)
  }, [useLocation().pathname]);
};

export const useSizes = ():void => {
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
