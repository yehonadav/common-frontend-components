import React, { useMemo, FC, useEffect, useState } from 'react';
import Fade, { FadeProps }  from '@material-ui/core/Fade';
import Slide, { SlideProps } from '@material-ui/core/Slide';
import Collapse, { CollapseProps } from '@material-ui/core/Collapse';
import Grow, { GrowProps } from '@material-ui/core/Grow';
import Zoom, { ZoomProps } from '@material-ui/core/Zoom';
import {Transition} from './Transition';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { sleep } from '../../utils'

type TransitionAction = {
  delay: TransitionProps['timeout'];
  ref: any;
  run: () => any;
}

const isOpen = (open: boolean, reverse: boolean) => reverse ? !open : open;

interface IUseTransitionActionHandler {
  delay?: TransitionProps['timeout'];
  reverse: boolean;
}

export const createUseTransitionActionHandler = (transition: Transition) => {
  return ({ delay = 0, reverse }:IUseTransitionActionHandler ) => {
    const [open, setOpen] = useState(false);
    const [appear, setAppear] = useState(true);

    const transitionIn = transition.useIn();
    
    const ref:any = useMemo(() => ({action:{}}), []);
    
    ref.open = isOpen(open, reverse);
    ref.setOpen = setOpen;
    ref.appear = appear;
    ref.setAppear = setAppear;
    ref.setOpen = setOpen;
    ref.transition = transition;
    ref.action.delay = delay;

    useEffect(() => {
      if (ref.transition) {
        const action: TransitionAction = {
          delay,
          ref,
          run: () => {
            const transitionIn = transition.getIn();

            if (delay === 0) {
              return ref.setOpen(transitionIn);
            }

            (async () => {
              if (typeof delay === 'number') {
                await sleep(delay);
              }

              else {
                if (delay.appear && ref.appear) {
                  ref.setAppear(false);
                  await sleep(delay.appear);
                }
                else if (delay.enter && transitionIn) {
                  ref.setAppear(false);
                  await sleep(delay.enter);
                }
                else if (delay.exit && !transitionIn) {
                  ref.setAppear(false);
                  await sleep(delay.exit);
                }
              }

              ref.setOpen(transitionIn);
            })();
          }
        };
        ref.action = action;
      }
    }, []);

    useEffect(() => {
      ref.action.run();
    }, [transitionIn])

    return ref;
  }
}

export interface IFadeTransition { 
  children: any;  
  divProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  transitionProps?: Partial<FadeProps>;
  delay?: TransitionProps['timeout'];
  reverse?: boolean;
 }

export const createFadeTransitionComponent = (transition:Transition):FC<IFadeTransition> => {
  const useTransitionActionHandler = createUseTransitionActionHandler(transition);

  return ({ children, divProps={}, transitionProps={}, delay, reverse=false }) => {
    transitionProps.in = useTransitionActionHandler({ delay, reverse }).open;

    return (
      <Fade {...transitionProps}>
        <div {...divProps}>
          {children}  
        </div>
      </Fade>  
    )
  }
}

export interface ISlideTransition { 
  children: any;  
  divProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  transitionProps?: Partial<SlideProps>;
  delay?: TransitionProps['timeout'];
  reverse?: boolean;
}

export const createSlideTransitionComponent = (transition:Transition):FC<ISlideTransition> => {
  const useTransitionActionHandler = createUseTransitionActionHandler(transition);

  return ({ children, divProps={}, transitionProps={}, delay, reverse=false }) => {
    transitionProps.in = useTransitionActionHandler({ delay, reverse }).open;

    return (
      <Slide {...transitionProps}>
        <div {...divProps}>
          {children}  
        </div>
      </Slide>  
    )
  }
}

export interface ICollapseTransition { 
  children: any;  
  divProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  transitionProps?: Partial<CollapseProps>;
  delay?: TransitionProps['timeout'];
  reverse?: boolean;
}

export const createCollapseTransitionComponent = (transition:Transition):FC<ICollapseTransition> => {
  const useTransitionActionHandler = createUseTransitionActionHandler(transition);

  return ({ children, divProps={}, transitionProps={}, delay, reverse=false }) => {
    transitionProps.in = useTransitionActionHandler({ delay, reverse }).open;

    return (
      <Collapse {...transitionProps}>
        <div {...divProps}>
          {children}  
        </div>
      </Collapse>  
    )
  }
}

export interface IGrowTransition { 
  children: any;  
  divProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  transitionProps?: Partial<GrowProps>;
  delay?: TransitionProps['timeout'];
  reverse?: boolean;
}

export const createGrowTransitionComponent = (transition:Transition):FC<IGrowTransition> => {
  const useTransitionActionHandler = createUseTransitionActionHandler(transition);

  return ({ children, divProps={}, transitionProps={}, delay, reverse=false }) => {
    transitionProps.in = useTransitionActionHandler({ delay, reverse }).open;

    return (
      <Grow {...transitionProps}>
        <div {...divProps}>
          {children}  
        </div>
      </Grow>  
    )
  }
}

export interface IZoomTransition { 
  children: any;  
  divProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  transitionProps?: Partial<ZoomProps>;
  delay?: TransitionProps['timeout'];
  reverse?: boolean;
}

export const createZoomTransitionComponent = (transition:Transition):FC<IZoomTransition> => {
  const useTransitionActionHandler = createUseTransitionActionHandler(transition);

  return ({ children, divProps={}, transitionProps={}, delay, reverse=false }) => {
    transitionProps.in = useTransitionActionHandler({ delay, reverse }).open;

    return (
      <Zoom {...transitionProps}>
        <div {...divProps}>
          {children}  
        </div>
      </Zoom>  
    )
  }
}

export interface IRenderDelayTransition {
  children: any;
  delay: TransitionProps['timeout'];
  reverse: boolean;
}

export const createRenderDelayTransitionComponent = (transition:Transition):FC<IRenderDelayTransition> => {
  const useTransitionActionHandler = createUseTransitionActionHandler(transition);

  return ({ children, delay, reverse=false }) =>
    useTransitionActionHandler({ delay, reverse }).open
      ? children : null;
}