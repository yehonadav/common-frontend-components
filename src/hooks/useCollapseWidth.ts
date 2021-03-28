import {useOpenSpring} from './useOpenSpring'


export const useCollapseWidth = ({width=0, open=true, closeWidth=0}) => {
  const {style, set_style, animaStyle} = useOpenSpring({
    open,
    initialStyle: {width: 0, from: {width: 0}},
    openStyle: {width, from: {width: closeWidth}},
    closeStyle: {width: closeWidth, from: {width}},
  });

  return {
    style,
    set_style,
    animaStyle,
  };
};
