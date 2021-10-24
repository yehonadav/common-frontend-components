import { requestAuth, request } from '../../api'
import { appConfig, isStageLocal } from '../../variables'
import req from 'axios'
import { handleApiError, handleApiSuccess } from '../../api/helpers'
import { headersJson } from '../../api/headers'
import { persistLocal } from '@yehonadav/safestorage'
import { NullableUser } from './types'

export const call_register = (params: Record<string, unknown>) =>
  request.post(`${appConfig.accountUrl}/register`, params);

export const call_login = ({email, password, recaptcha}:{email:string, password:string, recaptcha:string}) =>
  request.post(`${appConfig.accountUrl}/auth/email/recaptcha`, {email, password, recaptcha});

export const call_login_google = ({ token }:{token: string}) =>
  request.post(`${appConfig.accountUrl}/auth/google`, {token});

export const call_refresh = isStageLocal
  ? () => request.post(`${appConfig.accountUrl}/refresh-token`, {})
  : () => {
    const user = persistLocal.tryToGetItem<NullableUser>('persistLocal-account').value;
    return request.post(`${appConfig.accountUrl}/refresh-token-local/${user?.id || 'null'}`, {});
  };

export const call_verifyEmail = (token: string) =>
  request.post(`${appConfig.accountUrl}/verify-email`, {token});

export const call_forgotPassword = (email: string) =>
  request.post(`${appConfig.accountUrl}/forgot-password`, {email});

export const call_validateResetToken = (token: string) =>
  request.post(`${appConfig.accountUrl}/validate-reset-token`, {token});

export const call_resetPassword = ({token, password, confirmPassword}:{token: string, password: string, confirmPassword: string}) =>
  request.post(`${appConfig.accountUrl}/reset-password`, {token, password, confirmPassword});

export const call_getById = (id: string) =>
  requestAuth.get(`${appConfig.accountUrl}/${id}`);

export const call_revoke_token = (authHeaders:Record<string, string>) => {
  const url = `${appConfig.accountUrl}/revoke-token`;
  return req.post(url, {}, {
    headers: { ...headersJson, ...authHeaders },
    withCredentials: true,
  }).then(handleApiSuccess).catch(handleApiError);
}

export const call_update = (id: string, params: Record<string, unknown>) =>
  requestAuth.put(`${appConfig.accountUrl}/${id}`, params);

export const call_update_avatar = (id: string, file: any) =>
  requestAuth.putFile(`${appConfig.accountUrl}/${id}/photo`, 'avatar', file);

export const call_remove = (id: string) =>
  requestAuth.delete(`${appConfig.accountUrl}/${id}`);