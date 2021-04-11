import { getUser } from '../services'
import { appConfig } from '../variables'

export const headersJson = { 'Content-Type': 'application/json' };

export function authHeader(url: string): Record<string, string> {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = getUser()
  const isApiUrl = url.startsWith(appConfig.apiUrl || '')
  if (user && user.jwtToken && isApiUrl)
    return { Authorization: `Bearer ${user.jwtToken}` }
  return {}
}