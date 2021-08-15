import { createLinks } from '../../utils'
import { createPageTransitions } from '../../utils/createPageTransitions'

export const accountRoutes = {
  redirect_oauth: '/auth/redirect/login/',

  account: "/account",
  invalid_role: "/account/invalid_role",
  silent_signin: "/account/silent",
  signin: "/account/login",
  signup: "/account/register",
  verify_email: "/account/verify-email",
  forgot_password: "/account/forgot-password",
  reset_password: "/account/reset-password",

  profile: "/profile",
  update_profile: "/profile/update",
}

export const accountLinks = createLinks<typeof accountRoutes>(accountRoutes);
export const accountPageTransitions = createPageTransitions<typeof accountLinks>(accountLinks);
