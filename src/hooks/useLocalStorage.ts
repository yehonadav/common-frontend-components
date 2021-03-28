import {useState, useEffect, Dispatch, SetStateAction} from 'react'
import {setStorageItem, getStorageItem, local} from '../utils/storage'


// uuid is unique, but needs to be consistent with each refresh
export const useLocalStorage = <T=any>(uuid: string, initialState: T):[T, Dispatch<SetStateAction<T>>] => {
  try {
    initialState = getStorageItem<T>(local, uuid)
    // eslint-disable-next-line no-empty
  } catch (e) {}

  const [state, setState] = useState<T>(initialState);

  useEffect(() => {
    setStorageItem<T>(local, uuid, state)
  }, [state]);

  return [state, setState]
};
