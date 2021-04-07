import {appConfig} from '../variables';
import {getUser} from '../services';
import req, {AxiosResponse as Response, AxiosError as ErrorResponse} from 'axios'
import {accountService} from "../services/account/service";

function get(url: string):Promise<any> {
  return req.get(url, {headers: authHeader(url)}).then(handleSuccess).catch(handleError);
}

function post(url: string, body: Record<string, unknown>):Promise<any> {
  return req.post(url, body, {
    headers: { 'Content-Type': 'application/json', ...authHeader(url) },
    withCredentials: true,
  }).then(handleSuccess).catch(handleError);
}

function put(url: string, body: Record<string, unknown>):Promise<any> {
  return req.put(url, body, {
    headers: { 'Content-Type': 'application/json', ...authHeader(url) },
  }).then(handleSuccess).catch(handleError);
}

function patch(url: string, body: Record<string, unknown>):Promise<any> {
  return req.patch(url, body, {
    headers: { 'Content-Type': 'application/json', ...authHeader(url) },
  }).then(handleSuccess).catch(handleError);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url: string):Promise<any> {
  return req.delete(url, {headers: authHeader(url)}).then(handleSuccess).catch(handleError);

}

function put_file(url: string, key: string, file: any):Promise<any> {
  const data = new FormData();
  data.append(key, file);

  return req.put(url, data, {headers: authHeader(url)}).then(handleSuccess).catch(handleError);
}

// helper functions

export function authHeader(url: string):Record<string, string> {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = getUser();
  const isApiUrl = url.startsWith(appConfig.apiUrl||"");
  if (user && user.jwtToken && isApiUrl)
    return { Authorization: `Bearer ${user.jwtToken}` };
  return {};
}

export const handleSuccess = (response:Response):any => response.data;

export const handleError = (e: ErrorResponse):Promise<string> => {
  if (e.response && [401, 403].includes(e.response.status) && getUser()) {
    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
    accountService.logout();
  }

  return Promise.reject(
    (e.response && e.response.data && e.response.data.message)
    || (e.response && e.response.statusText)
    || "request failed"
  );
};

export const request = {
  get,
  post,
  put,
  delete: _delete,
  put_file,
  patch,
};