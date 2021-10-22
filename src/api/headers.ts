import { getUser } from '../services'

export const headersJson = { 'Content-Type': 'application/json' };

// return auth header with jwt if user is logged in and request is to the api url
export function authHeader(): { Authorization: string } {
  const jwtToken = getUser()?.jwtToken;

  if (!jwtToken)
    throw new Error("missing Authorization Bearer");

  return { Authorization: `Bearer ${jwtToken}` }
}