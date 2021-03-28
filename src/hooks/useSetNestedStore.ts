import {useCallback, useMemo} from "react";
import {pathIndexHandler} from './useGetNestedStore'

export const useSetState = (path:string) => {
  const container: any = useMemo(()=>({}), []);

  container.path = path;

  container.call = useCallback((data: any) => {
    const state = container.state;
    const path = container.path.split('.');
    const length = path.length-1;
    state.set((state: any) => {
      let ref = state;
      for (let i = 0; i < length; i++)
        ref = ref[pathIndexHandler(path[i])];
      ref[pathIndexHandler(path[length])] = data;
    })
  }, []);

  return useCallback(state => {
    container.state = state;
    return container.call;
  }, [])
};

export const useInputChange = (setState: any) =>
  useCallback((event) => setState(event.target.value), []);

export const useCheckboxChange = (setState: any) =>
  useCallback((event) => setState(event.target.checked), []);