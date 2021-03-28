import {useCallback} from "react";

export function pathIndexHandler(str:string) {
  const n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n >= 0 ? n : str;
}

export const getState = (path: string, state: any) =>
  path.split('.').reduce((o,i)=>o[pathIndexHandler(i)], state);

export const useGetState = (path:string) => useCallback((state: Record<string, unknown>) =>
  getState(path, state), [path]);

export const useGetInputState = (path:string) => {
  return useCallback((state: Record<string, unknown>) => {
    const value = getState(path, state);
    return value === undefined || value === null ? '' : value
  }, [path]);
};
