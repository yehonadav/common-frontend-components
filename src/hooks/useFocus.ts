import {useCallback} from "react";
import {useCustomContainer} from './useCustomContainer'

export const useFocus = () => {
  const container = useCustomContainer({focused:false});

  return useCallback(ref => {
    if (!container.focused && ref) {
      ref.focus();
      container.focused = true;
    }
  }, []);
};