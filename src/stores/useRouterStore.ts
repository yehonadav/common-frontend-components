import {useHistory, useLocation, useParams, useRouteMatch} from "react-router-dom";
import createStore from 'zustand'
import {CreateFetcher} from "../utils/storeFetchFunctions";
import {useEffect} from "react";
import {match as Match} from 'react-router';
import {History, Location} from 'history';
import {history} from '../utils/history'

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
export const fetchRouter: any = {
  // [state[key]]: state => state[state[key]],
};

export type MatchType = Match | {
  params: Record<string, any>;
  isExact: true;
  path: string;
  url: string;
};

export type State = () => {
  match: MatchType;
  params: Record<string, any>;
  history: History;
  location: Location;
};

export const state:State = {
  // @ts-ignore
  match: {
    params: {},
    isExact: true,
    path: history.location.pathname,
    url: window.location.href,
  },
  params: {},
  history: history,
  location: history.location,
};

export const stateCreator = ():State => CreateFetcher<State>(fetchRouter, state);

// store
// @ts-ignore
export const useRouterStore = createStore<State>(stateCreator);

// getters
export const get = useRouterStore.getState;

// setters
export const set = useRouterStore.setState;

// actions
// @ts-ignore
export const getMatch = (): Match => get().match;
// @ts-ignore
export const getParams = (): Record<string, unknown> => get().params;
// @ts-ignore
export const getHistory = (): History => get().history;
// @ts-ignore
export const getLocation = (): Location => get().location;

// high order hooks
export const useConnectRouterStore = ():void => {
  const match: Match = useRouteMatch();
  const params = useParams();
  const history: History = useHistory();
  const location: Location = useLocation();

  useEffect(() => {set(()=>({match}))}, [match]);
  useEffect(() => {set(()=>({params}))}, [params]);
  useEffect(() => {set(()=>({history}))}, [history]);
  useEffect(() => {set(()=>({location}))}, [location]);
};