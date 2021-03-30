import {request} from '../../api';
import {appConfig} from '../../variables';

export const call_register = (params: Record<string, unknown>) =>
  request.post(`${appConfig.accountUrl}/register`, params);

export const call_login = ({email, password, recaptcha}:{email:string, password:string, recaptcha:string}) =>
  request.post(`${appConfig.accountUrl}/authenticate`, {email, password, recaptcha});

export const call_login_google = ({ token }:{token: string}) =>
  request.post(`${appConfig.accountUrl}/authenticate/google`, {token});

export const call_refresh = () =>
  request.post(`${appConfig.accountUrl}/refresh-token`, {});

export const call_verifyEmail = (token: string) =>
  request.post(`${appConfig.accountUrl}/verify-email`, {token});

export const call_forgotPassword = (email: string) =>
  request.post(`${appConfig.accountUrl}/forgot-password`, {email});

export const call_validateResetToken = (token: string) =>
  request.post(`${appConfig.accountUrl}/validate-reset-token`, {token});

export const call_resetPassword = ({token, password, confirmPassword}:{token: string, password: string, confirmPassword: string}) =>
  request.post(`${appConfig.accountUrl}/reset-password`, {token, password, confirmPassword});

export const call_getById = (id: string) =>
  request.get(`${appConfig.accountUrl}/${id}`);

export const call_revoke_token = () =>
  request.post(`${appConfig.accountUrl}/revoke-token`, {});

export const call_update = (id: string, params: Record<string, unknown>) =>
  request.put(`${appConfig.accountUrl}/${id}`, params);

export const call_update_avatar = (id: string, file: any) =>
  request.put_file(`${appConfig.accountUrl}/${id}/photo`, 'avatar', file);

export const call_remove = (id: string) =>
  request.delete(`${appConfig.accountUrl}/${id}`);