// help function for zustand state store
export function CreateFetcher<State> (fetcher: any, state: State):State {
  // create fetch functions for better performance
  Object.keys(state).forEach(key => {fetcher[key] = (state: { [x: string]: any; }) => state[key]});
  return state
}
