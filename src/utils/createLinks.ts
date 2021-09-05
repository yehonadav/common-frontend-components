import { LinkOptions, Links } from '../types'
import { history } from './history'

export const createLinks = <Routes>(routes: Routes): Links<Routes> => {
  const links = {} as Links<Routes>;
  Object.keys(routes).forEach(k => {
    links[k] = (replace?:LinkOptions) => {
      let route = routes[k] as string;
      if (replace) {
        Object.keys(replace).forEach(k => {
          route = route.replace(':'+k, replace[k]);
        });
      }
      history.push(route);
    }
  });
  return links
}