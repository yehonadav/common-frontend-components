import create from 'zustand'
import { createStoreFetchFunctions } from '../utils';
import { State } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'
import { clearDataService, persistLocal } from '@yehonadav/safestorage'
import { PersistOptions } from '../types'
import { ICreateStore } from './createStore'

const getInitialValues = <TState>(persistOptions: PersistOptions<TState>, getDefaultValues: () => TState):TState => {
  const state = getDefaultValues();

  const {value} = persistLocal.tryToGetItem(persistOptions.name);

  if (value)
    Object.assign(state, value);

  return state;
}

export interface ICreateStorePersist <TState extends State> extends ICreateStore<TState> {
  persistOptions: PersistOptions<TState>;
  persistAfterClearingStorage?: boolean;
}

export const createStorePersist = <TState extends State>(
  {
    persistOptions,
    getDefaultValues,
    persistAfterClearingStorage = false,
  }:ICreateStorePersist<TState>) =>
{
  const state: TState = getInitialValues<TState>(persistOptions, getDefaultValues);
  const fetchStore = createStoreFetchFunctions<TState>(state)
  const useStore = create<TState>(persist(() => state, persistOptions));

  if (persistAfterClearingStorage)
    // data will persist even after logout
    clearDataService.excludeLocalStorageItem(persistOptions.name);

  return {
    useStore,
    fetchStore,
    get: useStore.getState,
    set: useStore.setState,
  }
}
