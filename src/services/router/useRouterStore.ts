import createStore from 'zustand'
import {useHistory, useLocation, useParams, useRouteMatch} from "react-router-dom";
import {CreateFetcher} from '../../utils';
import {useEffect} from "react";
import {match as Match} from 'react-router';
import {History, Location} from 'history';
import {history} from '../../utils'

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
const fetchStore: any = {
  // [state[key]]: state => state[state[key]],
};

type MatchType = Match | {
  params: Record<string, any>;
  isExact: true;
  path: string;
  url: string;
};

type State = {
  match: MatchType;
  params: Record<string, any>;
  history: History;
  location: Location;
};

const state:State = {
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

const stateCreator = ():State => CreateFetcher<State>(fetchStore, state);

// store
// @ts-ignore
const useStore = createStore<State>(stateCreator);

// getters
const get = useStore.getState;

// setters
const set = useStore.setState;

// actions
const getMatch = (): Match => get().match;

const getParams = (): Record<string, unknown> => get().params;

const getHistory = (): History => get().history;

const getLocation = (): Location => get().location;

// high order hooks
const useConnectRouterStore = ():void => {
  const match: Match = useRouteMatch();
  const params = useParams();
  const history: History = useHistory();
  const location: Location = useLocation();

  useEffect(() => {set(()=>({match}))}, [match]);
  useEffect(() => {set(()=>({params}))}, [params]);
  useEffect(() => {set(()=>({history}))}, [history]);
  useEffect(() => {set(()=>({location}))}, [location]);
};

export {
  Location,
  History,
  Match,
  fetchStore as fetchRouterStore,
  MatchType,
  State as TstateRouterStore,
  state as stateRouterStore,
  stateCreator as stateCreatorRouterStore,
  useStore as useRouterStore,
  get as getRouterStore,
  set as setRouterStore,

  getMatch,
  getParams,
  getHistory,
  getLocation,

  useConnectRouterStore,
}