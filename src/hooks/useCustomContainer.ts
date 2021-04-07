import {useMemo} from "react";

// empty container
export const useContainer = ():Record<string, any> => useMemo(()=>({}), []);

// container with initial props
export const useCustomContainer = <T>(props:T):T => useMemo(()=>props, []);

// container update on each render
export const useOverrideContainer = (props:Record<string, any>):Record<string, any> => {
  const container: Record<string, unknown> = useContainer();
  Object.assign(container, props);
  return container;
};