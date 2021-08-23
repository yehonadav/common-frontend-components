import { createStore, sleep } from '../../utils'

// half gauss
export function ease(x:number):number {
  if (x < 0.5) {
    return Math.pow(x * 2, 2) / 2;
  }
  return 1 - Math.pow((1 - x) * 2, 2) / 2;
}

// https://www.gizma.com/easing/
export function easeInOutQuad(t:number, b:number, c:number, d:number):number {
  t /= d/2;
  if (t < 1)
    return c/2*t*t + b;
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
}

export type ScrollToTargetProps = {
  scroller: HTMLElement,
  target: HTMLElement,
  duration: number,
  offset: number,
  frame: number,
}

export type ScrollToYProps = {
  scroller: HTMLElement,
  y: number,
  duration: number,
  frame: number,
}

export type ScrollToXProps = {
  scroller: HTMLElement,
  x: number,
  duration: number,
  frame: number,
}

export type ScrollToPositionProps = {
  scroller: HTMLElement,
  x: number,
  y: number,
  duration: number,
  frame: number,
}

export const scrollToTarget = async (
  {
    scroller,
    target,
    duration,
    offset,
  }: ScrollToTargetProps):Promise<void> => {

  const start = scroller.scrollTop;
  const stop = target.getBoundingClientRect().top + offset;
  let startTime: number | null = null;

  // distance in pixels (- is up, + is down)
  const distance = stop - start;

  function animation(currentTime: number) {
    if (startTime === null)
      startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, start, distance, duration);
    scroller.scrollTo(0, run);
    if (timeElapsed < duration)
      requestAnimationFrame(animation);
    else
      scroller.scrollTop = stop;
  }
  requestAnimationFrame(animation);

  // if (duration > frame) {
  //   const cycles = Math.floor(duration / frame);
  //
  //   for (let i=0; i < cycles; i++) {
  //     scroller.scrollTop = start + ease((i+1)/cycles) * distance;
  //     await sleep(frame)
  //   }
  // }

};

export const scrollToX = async (
  {
    scroller,
    x,
    duration,
    frame,
  }: ScrollToXProps):Promise<void> => {

  const start_x = scroller.scrollLeft;
  const stop_x = x;

  // distance in pixels (- is up, + is down)
  const distance_x = stop_x - start_x;

  if (duration > frame) {
    const cycles = Math.floor(duration / frame);

    for (let i=0; i < cycles; i++) {
      scroller.scrollLeft = start_x + ease((i+1)/cycles) * distance_x;
      await sleep(frame)
    }
  }

  scroller.scrollLeft = stop_x;
};

export const scrollToY = async (
  {
    scroller,
    y,
    duration,
    frame,
  }: ScrollToYProps):Promise<void> => {

  const start_y = scroller.scrollTop;
  const stop_y = y;

  // distance in pixels (- is up, + is down)
  const distance_y = stop_y - start_y;

  if (duration > frame) {
    const cycles = Math.floor(duration / frame);

    for (let i=0; i < cycles; i++) {
      scroller.scrollTop = start_y + ease((i+1)/cycles) * distance_y;
      await sleep(frame)
    }
  }

  scroller.scrollTop = stop_y;
};

export const scrollToPosition = async (
  {
    scroller,
    x, y,
    duration,
    frame,
  }: ScrollToPositionProps):Promise<void> => {

  const start_y = scroller.scrollTop;
  const start_x = scroller.scrollLeft;
  const stop_y = y;
  const stop_x = x;

  // distance in pixels (- is up, + is down)
  const distance_y = stop_y - start_y;
  const distance_x = stop_x - start_x;

  if (duration > frame) {
    const cycles = Math.floor(duration / frame);

    for (let i=0; i < cycles; i++) {
      scroller.scrollTop = start_y + ease((i+1)/cycles) * distance_y;
      scroller.scrollLeft = start_x + ease((i+1)/cycles) * distance_x;
      await sleep(frame)
    }
  }

  scroller.scrollTop = stop_y;
  scroller.scrollLeft = stop_x;
};

export const scrollByX = async (
  {
    scroller,
    x,
    duration,
    frame,
  }: ScrollToXProps):Promise<void> => {

  const start_x = scroller.scrollLeft;
  const stop_x = start_x + x;

  // distance in pixels (- is up, + is down)
  const distance_x = stop_x - start_x;

  if (duration > frame) {
    const cycles = Math.floor(duration / frame);

    for (let i=0; i < cycles; i++) {
      scroller.scrollLeft = start_x + ease((i+1)/cycles) * distance_x;
      await sleep(frame)
    }
  }

  scroller.scrollLeft = stop_x;
};

export const scrollByY = async (
  {
    scroller,
    y,
    duration,
    frame,
  }: ScrollToYProps):Promise<void> => {

  const start_y = scroller.scrollTop;
  const stop_y = start_y + y;

  // distance in pixels (- is up, + is down)
  const distance_y = stop_y - start_y;

  if (duration > frame) {
    const cycles = Math.floor(duration / frame);

    for (let i=0; i < cycles; i++) {
      scroller.scrollTop = start_y + ease((i+1)/cycles) * distance_y;
      await sleep(frame)
    }
  }

  scroller.scrollTop = stop_y;
};

export const scrollByPosition = async (
  {
    scroller,
    x, y,
    duration,
    frame,
  }: ScrollToPositionProps):Promise<void> => {

  const start_y = scroller.scrollTop;
  const start_x = scroller.scrollLeft;
  const stop_y = start_y + y;
  const stop_x = start_x + x;

  // distance in pixels (- is up, + is down)
  const distance_y = stop_y - start_y;
  const distance_x = stop_x - start_x;

  if (duration > frame) {
    const cycles = Math.floor(duration / frame);

    for (let i=0; i < cycles; i++) {
      scroller.scrollTop = start_y + ease((i+1)/cycles) * distance_y;
      scroller.scrollLeft = start_x + ease((i+1)/cycles) * distance_x;
      await sleep(frame)
    }
  }

  scroller.scrollTop = stop_y;
  scroller.scrollLeft = stop_x;
};

export type Position = {
  x: number;
  y: number;
}

type Direction = 'left' | 'right' | 'up' | 'down' | 'none';

const isScrollUp = (direction:Direction):boolean => direction === 'up';
const isScrollTop = (position:Position):boolean => position.y === 0;

type State = {
  position: Position;
  direction: Direction;
  isScrollingUp: boolean;
  isScrolledToTop: boolean;
}

export interface IScroll {
  element: HTMLElement;
}

export class Scroll {
  private element: HTMLElement;
  private ticking: boolean;
  private readonly positions: Position[];
  public addEventListener: () => void;
  public removeEventListener: () => void;
  public getPosition: () => Position;
  public usePosition: () => Position;
  public getDirection: () => Direction;
  public useDirection: () => Direction;
  public getIsScrollingUp: () => boolean;
  public useIsScrollingUp: () => boolean;
  public getIsScrolledToTop: () => boolean;
  public useIsScrolledToTop: () => boolean;

  constructor(options:IScroll) {
    const startingPosition:Position = {
      x: 0,
      y: 0,
    };

    this.element = options.element;
    this.ticking = false;
    this.positions = [startingPosition];

    const {
      get,
      set,
      useStore,
      fetchStore,
    } = createStore<State>({ getDefaultValues: () => ({
        position: startingPosition,
        direction: 'none',
        isScrollingUp: false,
        isScrolledToTop: true,
      })});

    const handler = () => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          const update:Partial<State> = {};

          const newPosition = {
            x: this.element.scrollLeft,
            y: this.element.scrollTop,
          };

          update.position = newPosition;

          this.positions.push(newPosition);

          if (this.positions.length > 1) {
            if (this.positions.length > 2)
              this.positions.shift();

            const oldPosition = this.positions[0];

            if (newPosition.x > oldPosition.x)
              update.direction = 'right';

            else if (newPosition.x < oldPosition.x)
              update.direction = 'left';

            else if (newPosition.y > oldPosition.y)
              update.direction = 'down';

            else if (newPosition.y < oldPosition.y)
              update.direction = 'up';

            else
              update.direction = 'none';

            update.isScrollingUp = isScrollUp(update.direction);
          }

          update.isScrolledToTop = isScrollTop(update.position);

          set(update as State);
          this.ticking = false;
        });
      }
      this.ticking = true;
    }

    this.getPosition = ():Position => get().position;
    this.usePosition = ():Position => useStore(fetchStore.position);
    this.getDirection = ():Direction => get().direction;
    this.useDirection = ():Direction => useStore(fetchStore.direction);
    this.getIsScrollingUp = ():boolean => get().isScrollingUp;
    this.useIsScrollingUp = ():boolean => useStore(fetchStore.isScrollingUp);
    this.getIsScrolledToTop = ():boolean => get().isScrolledToTop;
    this.useIsScrolledToTop = ():boolean => useStore(fetchStore.isScrolledToTop);

    this.addEventListener = () => this.element.addEventListener('scroll', handler);
    this.removeEventListener = () => this.element.removeEventListener('scroll', handler);

    this.addEventListener();
  }

  setX = (x:number):Scroll => {
    this.element.scrollLeft = x;
    return this;
  };

  setY = (y:number):Scroll => {
    this.element.scrollTop = y;
    return this;
  };

  scrollTo = async (
    {
      id, x, y,
      duration=600,
      offset=0,
      frame=30,
      delay=0,
    }: {
      id?: string; x?:number; y?:number;
      duration?:number;
      offset?:number;
      frame?:number;
      delay?:number;
    }):Promise<Scroll> =>
  {
    delay && await sleep(delay);

    if (id) {
      const target = document.getElementById(id);
      if (!target)
        console.error(`target not found`);

      else
        scrollToTarget({
          scroller: this.element,
          target,
          duration,
          offset,
          frame,
        });
    }

    else if (y !== undefined || x !== undefined) {
      if (y === undefined && x)
        scrollToX({scroller: this.element, x, duration, frame});
      else if (x === undefined && y)
        scrollToY({scroller: this.element, y, duration, frame});
      else if (x && y)
        scrollToPosition({scroller: this.element, x, y, duration, frame})
    }
    return this
  }

  ScrollBy = async (
    {
      x, y,
      duration=600,
      frame=30,
      delay=0,
    }:{
      x?:number; y?:number;
      duration?:number;
      frame?:number;
      delay?:number;
    }):Promise<Scroll> => {

    if (!this.element) {
      console.error(`scroller not found`);
      return this;
    }

    delay && await sleep(delay);

    if (y !== undefined || x !== undefined) {
      if (y === undefined && x)
        scrollByX({scroller: this.element, x, duration, frame});
      else if (x === undefined && y)
        scrollByY({scroller: this.element, y, duration, frame});
      else if (x && y)
        scrollByPosition({scroller: this.element, x, y, duration, frame})
    }
    return this
  };
}

export const documentScroll = new Scroll({element:document.documentElement});
export const bodyScroll = new Scroll({element:document.body});
