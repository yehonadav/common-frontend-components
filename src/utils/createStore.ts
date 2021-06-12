import create from 'zustand'
import { createStoreFetchFunctions } from '../utils';
import { State } from 'zustand/vanilla'

export interface ICreateStore <TState extends State> {
  getDefaultValues: () => TState;
}

export const createStore = <TState extends State>({ getDefaultValues }:ICreateStore<TState>) => {
  const state: TState = getDefaultValues();
  const fetchStore = createStoreFetchFunctions<TState>(state)
  const useStore = create<TState>(() => state);

  return {
    useStore,
    fetchStore,
    get: useStore.getState,
    set: useStore.setState,
  }
}
