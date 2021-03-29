import {request} from "../../api/request";
import {appConfig} from '../../variables';

const baseUrl = `${appConfig.apiUrl}/accounts`;

export const call_register = (params: Record<string, unknown>) =>
  request.post(`${baseUrl}/register`, params);

export const call_login = ({email, password, recaptcha}:{email:string, password:string, recaptcha:string}) =>
  request.post(`${baseUrl}/authenticate`, {email, password, recaptcha});

export const call_login_google = ({ token }:{token: string}) =>
  request.post(`${baseUrl}/authenticate/google`, {token});

export const call_refresh = () =>
  request.post(`${baseUrl}/refresh-token`, {});

export const call_verifyEmail = (token: string) =>
  request.post(`${baseUrl}/verify-email`, {token});

export const call_forgotPassword = (email: string) =>
  request.post(`${baseUrl}/forgot-password`, {email});

export const call_validateResetToken = (token: string) =>
  request.post(`${baseUrl}/validate-reset-token`, {token});

export const call_resetPassword = ({token, password, confirmPassword}:{token: string, password: string, confirmPassword: string}) =>
  request.post(`${baseUrl}/reset-password`, {token, password, confirmPassword});

export const call_getById = (id: string) =>
  request.get(`${baseUrl}/${id}`);

export const call_revoke_token = () =>
  request.post(`${baseUrl}/revoke-token`, {});

export const call_update = (id: string, params: Record<string, unknown>) =>
  request.put(`${baseUrl}/${id}`, params);

export const call_update_avatar = (id: string, file: any) =>
  request.put_file(`${baseUrl}/${id}/photo`, 'avatar', file);

export const call_remove = (id: string) =>
  request.delete(`${baseUrl}/${id}`);