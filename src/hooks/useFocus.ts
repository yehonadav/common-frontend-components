import {useCallback} from "react";
import {useWrap} from './useWrap'

export const useFocus = () => {
  const container = useWrap({focused:false});

  return useCallback(ref => {
    if (!container.focused && ref) {
      ref.focus();
      container.focused = true;
    }
  }, []);
};