import { requestAuth } from '../../api'
import {appConfig} from '../../variables';
import req from 'axios'
import { handleApiError, handleApiSuccess } from '../../api/helpers'

export const call_register = (params: Record<string, unknown>) =>
  requestAuth.post(`${appConfig.accountUrl}/register`, params);

export const call_login = ({email, password, recaptcha}:{email:string, password:string, recaptcha:string}) =>
  requestAuth.post(`${appConfig.accountUrl}/authenticate`, {email, password, recaptcha});

export const call_login_google = ({ token }:{token: string}) =>
  requestAuth.post(`${appConfig.accountUrl}/authenticate/google`, {token});

export const call_refresh = () =>
  requestAuth.post(`${appConfig.accountUrl}/refresh-token`, {});

export const call_verifyEmail = (token: string) =>
  requestAuth.post(`${appConfig.accountUrl}/verify-email`, {token});

export const call_forgotPassword = (email: string) =>
  requestAuth.post(`${appConfig.accountUrl}/forgot-password`, {email});

export const call_validateResetToken = (token: string) =>
  requestAuth.post(`${appConfig.accountUrl}/validate-reset-token`, {token});

export const call_resetPassword = ({token, password, confirmPassword}:{token: string, password: string, confirmPassword: string}) =>
  requestAuth.post(`${appConfig.accountUrl}/reset-password`, {token, password, confirmPassword});

export const call_getById = (id: string) =>
  requestAuth.get(`${appConfig.accountUrl}/${id}`);

export const call_revoke_token = (authHeaders:Record<string, string>) => {
  const url = `${appConfig.accountUrl}/revoke-token`;
  return req.post(url, {}, {
    headers: { 'Content-Type': 'application/json', ...authHeaders },
    withCredentials: true,
  }).then(handleApiSuccess).catch(handleApiError);
}

export const call_update = (id: string, params: Record<string, unknown>) =>
  requestAuth.put(`${appConfig.accountUrl}/${id}`, params);

export const call_update_avatar = (id: string, file: any) =>
  requestAuth.putFile(`${appConfig.accountUrl}/${id}/photo`, 'avatar', file);

export const call_remove = (id: string) =>
  requestAuth.delete(`${appConfig.accountUrl}/${id}`);