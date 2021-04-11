import { User } from './types'
import { now } from '../../variables'

export const defaultUserDetails:User = {
  id: "",
  avatar_hd: "",
  avatar: "",

  // for statistics
  created: now,
  updated: now,
  acceptTerms: now,

  // private info
  firstName: "",
  lastName: "",
  email: "",
  phone: "",

  // advertisement
  newsletter: true,

  role: "",

  jwtToken: "",
}

export const TokenStatus = {
  Validating: 'Validating',
  Valid: 'Valid',
  Invalid: 'Invalid',
  Missing: 'Missing',
};

export const silentRefreshShield = { silentlyRunning: false }