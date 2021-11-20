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
import { createStore, createStorePersist, sleep } from '../../utils'
import { RequestStatus } from '../../variables'
import { pageRegisteredTransitions } from './pageRegisteredTransitions'
import { PersistOptions } from '../../types'
import { getStorageCall } from '@yehonadav/safestorage'

type State = { in: boolean };

type InitialLoad = {
  open?: boolean;
  pageRegister?: boolean;

};

const defaultInitialLoad:InitialLoad = {
  open: true,
  pageRegister: true,
};

type ITransition = {
  initialValue?: boolean;
  persist?: {
    name: string;
    persistAfterClearingStorage: boolean;
  }
}

const createTransitionStore = (props?:ITransition) => {
  const initialValue = props?.initialValue === undefined ? true : props.initialValue;

  if (props?.persist === undefined)
    return createStore<State>({ getDefaultValues: () => ({in: initialValue})});

  const persistOptions: PersistOptions<State> = {
    name: props.persist.name,
    whitelist: ["in"],
    getStorage: getStorageCall,
  };

  return createStorePersist<State>({
    persistOptions,
    getDefaultValues: () => ({in: initialValue}),
    persistAfterClearingStorage: props.persist.persistAfterClearingStorage,
  });
}

export class Transition {
  private readonly store: ReturnType<typeof createTransitionStore>;
  public getIn: () => boolean;
  public setIn: () => void;
  public setOut: () => void;
  public toggle: () => void;
  public setOpen: (open: boolean) => void;
  public exit: (delay: number) => Promise<void>;
  public useIn: () => boolean;
  public useSwitchDelay: (open: boolean, delay: TransitionProps["timeout"]) => boolean;
  public useConnect: (state: boolean) => void;
  public useSetOnLoad: (options?: InitialLoad) => void;
  public useStatus: (status: RequestStatus) => RequestStatus;
  public Fade: FC<IFadeTransition>;
  public Slide: FC<ISlideTransition>;
  public Collapse: FC<ICollapseTransition>;
  public Grow: FC<IGrowTransition>;
  public Zoom: FC<IZoomTransition>;
  public RenderDelay: FC<IRenderDelayTransition>;

  constructor(props?:ITransition) {
    this.store = createTransitionStore(props);

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

    this.useSetOnLoad = ({ open = true, pageRegister = true }=defaultInitialLoad) => {
      useOnLoad(() => {
        set({in: open});
        if (pageRegister)
          pageRegisteredTransitions.items.push(this);
      })
    };

    this.useStatus = (status: RequestStatus) => {
      const [state, setState] = useState(status);

      useAsync(async () => {
        if (status === RequestStatus.pending || status === RequestStatus.loading) {
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
