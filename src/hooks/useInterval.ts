import { useEffect, useRef } from 'react';
import { BaseFunctionType } from '../types'
import { do_nothing_function } from '../utils'

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export default function (callback:BaseFunctionType, delay:number|undefined|null|false) {
  const savedCallback = useRef<BaseFunctionType>(callback);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (typeof delay === 'number' && delay > 0) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return do_nothing_function
  }, [delay]);
}