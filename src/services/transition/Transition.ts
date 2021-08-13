import { FC, useEffect, useState } from 'react';
import {
  IFadeTransition, createFadeTransitionComponent,
  ISlideTransition, createSlideTransitionComponent,
  ICollapseTransition, createCollapseTransitionComponent,
  IGrowTransition, createGrowTransitionComponent,
  IZoomTransition, createZoomTransitionComponent,
  IRenderDelayTransition, createRenderDelayTransitionComponent,
} from './TransitionComponents';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { getTimeoutNumber } from "./getTimeoutNumber";
import { useAsync, useOnLoad } from '../../hooks'
import { createStore, sleep } from '../../utils'
import { requestStatus } from '../../variables'

type State = { in: boolean };

const createTransitionStore = () => createStore<State>({ getDefaultValues: () => ({in: true})});

export class Transition {
  public store: ReturnType<typeof createTransitionStore>;
  public getIn: () => boolean;
  public setIn: () => void;
  public setOut: () => void;
  public toggle: () => void;
  public setOpen: (open: boolean) => void;
  public exit: (delay: number) => Promise<void>;
  public useIn: () => boolean;
  public useSwitchDelay: (open: boolean, delay: TransitionProps["timeout"]) => boolean;
  public useConnect: (state: boolean) => void;
  public useSetOnLoad: (open?: boolean) => void;
  public useStatus: (status: requestStatus) => requestStatus;
  public Fade: FC<IFadeTransition>;
  public Slide: FC<ISlideTransition>;
  public Collapse: FC<ICollapseTransition>;
  public Grow: FC<IGrowTransition>;
  public Zoom: FC<IZoomTransition>;
  public RenderDelay: FC<IRenderDelayTransition>;

  constructor() {
    this.store = createTransitionStore();
    const { useStore, get, set, fetchStore } = this.store;

    this.getIn = () => get().in;

    this.setIn = () => set({ in: true });
    this.setOut = () => set({ in: false });
    this.toggle = () => set({ in: !get().in });
    this.setOpen = (open:boolean) => set({in: open});

    this.exit = async (delay) => {
      set({ in: false });
      await sleep(delay);
      return;
    };

    this.useIn = () => useStore(fetchStore.in);

    this.useSwitchDelay = (open:boolean, delay:TransitionProps['timeout']) => {
      const [openDelayed, setOpenDelayed] = useState(open);

      useAsync(async () => {
        set({in: open});
        await sleep(getTimeoutNumber(delay, open));
        setOpenDelayed(open);
      },[open, delay]);

      return openDelayed;
    };

    this.useConnect = state => {
      useEffect(() => {
        set({in: state});
      },[state])
    };

    this.useSetOnLoad = (open=true) => {
      useOnLoad(() => {
        set({in: open});
      })
    };

    this.useStatus = (status: requestStatus) => {
      const [state, setState] = useState(status);

      useAsync(async () => {
        if (status === requestStatus.pending || status === requestStatus.loading) {
          this.setIn();
          await sleep(1000);
          setState(status);
        }
        else {
          this.setOut();
          await sleep(400);
          setState(status);
        }
      }, [status]);

      return state;
    };

    this.Fade = createFadeTransitionComponent(this);
    this.Slide = createSlideTransitionComponent(this);
    this.Collapse = createCollapseTransitionComponent(this);
    this.Grow = createGrowTransitionComponent(this);
    this.Zoom = createZoomTransitionComponent(this);
    this.RenderDelay = createRenderDelayTransitionComponent(this);
  }
}
