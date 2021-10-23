import req, { AxiosRequestConfig } from 'axios'
import { authCall } from "./auth";
import { handleApiSuccess, handleApiError } from "./helpers";
import { headersJson, authHeader } from './headers'

function get<Response=any>(url: string, config: AxiosRequestConfig={}):Promise<Response> {
  return authCall(() => req.get(url, {...config, headers: authHeader()}))()
    .then(handleApiSuccess).catch(handleApiError);
}

function post<Response=any>(url: string, body?: any, config: AxiosRequestConfig={}):Promise<Response> {
  return authCall(() => req.post(url, body, {...config,
    headers: { ...headersJson, ...authHeader() },
    withCredentials: true,
  }))().then(handleApiSuccess).catch(handleApiError);
}

function put<Response=any>(url: string, body?: any, config: AxiosRequestConfig={}):Promise<Response> {
  return authCall(() => req.put(url, body, {...config,
    headers: { ...headersJson, ...authHeader() },
  }))().then(handleApiSuccess).catch(handleApiError);
}

function patch<Response=any>(url: string, body?: any, config: AxiosRequestConfig={}):Promise<Response> {
  return authCall(() => req.patch(url, body, {...config,
    headers: { ...headersJson, ...authHeader() },
  }))().then(handleApiSuccess).catch(handleApiError);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete<Response=any>(url: string, config: AxiosRequestConfig={}):Promise<Response> {
  return authCall(() => req.delete(url, {...config, headers: authHeader()}))()
    .then(handleApiSuccess).catch(handleApiError);
}

function putFile<Response=any>(url: string, key: string, file: any, config: AxiosRequestConfig={}):Promise<Response> {
  const data = new FormData();
  data.append(key, file);

  return authCall(() => req.put(url, data, {...config, headers: authHeader()}))()
    .then(handleApiSuccess).catch(handleApiError);
}

export const requestAuth = {
  get,
  post,
  put,
  delete: _delete,
  putFile,
  patch,
};