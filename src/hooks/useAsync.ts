import { DependencyList, useEffect, useMemo } from 'react'
import {AsyncFunction} from "../types";
import { createAsyncBuffer } from '../utils/runAsyncInOrder'

export const useAsync = (asyncCall: AsyncFunction, deps?: DependencyList): void => {
  const runAsyncInOrder = useMemo(()=>createAsyncBuffer(),[]);
  useEffect(()=>{runAsyncInOrder(asyncCall)}, deps);
};
