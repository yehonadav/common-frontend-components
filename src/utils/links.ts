import { routes } from '../variables'
import { history } from './history'
import { createPageTransitions } from './createPageTransitions'

export const links = {
  //////////////////////////////
  // generic navigation links //
  //////////////////////////////

  goBackOrHome: (): void => {
    history.action === "PUSH"
      ? history.goBack()
      : history.push(routes.home);
  },

  go_back: (): void =>
    history.push(routes.go_back),

  refresh: (): void =>
    history.go(0),

  go_home: (): void =>
    history.push(routes.home),

  ///////////////////////
  // generic app links //
  ///////////////////////

  go_to_about: (): void =>
    history.push(routes.about),

  go_to_privacy: (): void =>
    history.push(routes.privacy),

  go_to_terms: (): void =>
    history.push(routes.terms),

  go_to_contact: (): void =>
    history.push(routes.contact),
};

export const pageTransitions = createPageTransitions<typeof links>(links);
