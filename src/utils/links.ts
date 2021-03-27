import { routes } from '../variables'
import { history } from './history'

export const links = {
  //////////////////////////////
  // generic navigation links //
  //////////////////////////////

  goBackOrHome: (): void => {
    history.action === "PUSH"
      ? history.back()
      : history.push(routes.home);
  },

  go_back: (): void =>
    history.push(routes.go_back),

  refresh: (): void =>
    history.push(routes.refresh),

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

  ///////////////////////////
  // generic account links //
  ///////////////////////////

  go_to_signin: (): void =>
    history.push(routes.signin),

  go_to_signup: (): void =>
    history.push(routes.signup),

  go_to_verify_email: (): void =>
    history.push(routes.verify_email),

  go_to_forgot_password: (): void =>
    history.push(routes.forgot_password),

  go_to_reset_password: (): void =>
    history.push(routes.reset_password),

  go_to_profile: (): void =>
    history.push(routes.profile),

  go_to_update_profile: (): void =>
    history.push(routes.update_profile),

};