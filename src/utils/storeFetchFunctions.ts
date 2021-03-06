export type FetchStore<State> = {[K in keyof State]: (state:State) => State[K]};

// help function for zustand state store
export function CreateFetcher<State> (fetcher: any, state: State):State {
  // create fetch functions for better performance
  Object.keys(state).forEach(key => {fetcher[key] = (state: { [x: string]: any; }) => state[key]});
  return state
}

export function createStoreFetchFunctions<State>(state:State):FetchStore<State> {
  const fetchStore = {};

  CreateFetcher(fetchStore, state);

  return fetchStore as FetchStore<State>
}