import { Links } from '../types'
import { history } from './history'

export const createLinks = <Routes>(routes: Routes): Links<Routes> => {
  const links = {} as Links<Routes>;
  Object.keys(routes).forEach(k => {
    links[k] = () => history.push(routes[k]);
  });
  return links
}