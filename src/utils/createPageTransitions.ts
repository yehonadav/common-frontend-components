import { PageTransitions, PageTransitionsOptions } from '../types'
import { pageRegisteredTransitions } from '../services/transition/pageRegisteredTransitions'
import { sleep } from './sleep'
import { createAsyncBuffer } from './runAsyncInOrder'

const runPageTransitionsAsync = createAsyncBuffer();

export const createPageTransitions = <Links>(links: Links): PageTransitions<Links> => {
  const pageTransitions = {} as PageTransitions<Links>;
  Object.keys(links).forEach(k => {
    pageTransitions[k] = (options?:PageTransitionsOptions|any) => runPageTransitionsAsync(async () => {
      pageRegisteredTransitions.items.forEach(t=>t.setOut());
      pageRegisteredTransitions.items = [];
      let delay = 500;
      let replace;
      if (options && !options.target) {
        delay = typeof options.delay === 'number' && options.delay;
        replace = options.replace;
      }
      await sleep(delay);
      links[k](replace);
    });
  });
  return pageTransitions
}