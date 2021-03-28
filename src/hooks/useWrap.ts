import {useMemo} from "react";

// empty container
export const useContainer = ():Record<string, any> => useMemo(()=>({}), []);

// container with initial props
export const useWrap = (props={}):Record<string, any> => useMemo(()=>({...props}), []);

// container update on each render
export const useWrapper = (props:Record<string, any>):Record<string, any> => {
  const container: Record<string, unknown> = useContainer();
  Object.assign(container, props);
  return container;
};