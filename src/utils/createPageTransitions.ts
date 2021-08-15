import { PageTransitions } from '../types'
import { pageRegisteredTransitions } from '../services/transition/pageRegisteredTransitions'
import { sleep } from './sleep'
import { createAsyncBuffer } from './runAsyncInOrder'

const runPageTransitionsAsync = createAsyncBuffer();

export const createPageTransitions = <Links>(links: Links): PageTransitions<Links> => {
  const pageTransitions = {} as PageTransitions<Links>;
  Object.keys(links).forEach(k => {
    pageTransitions[k] = (delay?: number|any) => runPageTransitionsAsync(async () => {
      pageRegisteredTransitions.items.forEach(t=>t.setOut());
      pageRegisteredTransitions.items = [];
      await sleep(typeof delay === 'number' ? delay : 500);
      links[k]();
    });
  });
  return pageTransitions
}