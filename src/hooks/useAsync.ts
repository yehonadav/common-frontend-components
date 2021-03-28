import {DependencyList, useEffect} from "react";
import {AsyncFunction} from "../types";

export const useAsync = (asyncCall: AsyncFunction, deps?: DependencyList): void => {
  useEffect(()=>{asyncCall()}, deps);
};
