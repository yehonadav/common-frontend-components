import { accountRoutes } from './accountRoutes'
import { history } from '../../utils'

export const accountLinks = {
  go_to_signin: (): void =>
    history.push(accountRoutes.signin),

  go_to_signup: (): void =>
    history.push(accountRoutes.signup),

  go_to_verify_email: (): void =>
    history.push(accountRoutes.verify_email),

  go_to_forgot_password: (): void =>
    history.push(accountRoutes.forgot_password),

  go_to_reset_password: (): void =>
    history.push(accountRoutes.reset_password),

  go_to_profile: (): void =>
    history.push(accountRoutes.profile),

  go_to_update_profile: (): void =>
    history.push(accountRoutes.update_profile),

};