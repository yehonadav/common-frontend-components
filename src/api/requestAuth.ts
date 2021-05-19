import req, { AxiosRequestConfig } from 'axios'
import { authCall } from "./auth";
import { handleApiSuccess, handleApiError } from "./helpers";
import { headersJson, authHeader } from './headers'

function get(url: string, config: AxiosRequestConfig={}):Promise<any> {
  return authCall(() => req.get(url, {...config, headers: authHeader(url)}))()
    .then(handleApiSuccess).catch(handleApiError);
}

function post(url: string, body?: any, config: AxiosRequestConfig={}):Promise<any> {
  return authCall(() => req.post(url, body, {...config,
    headers: { ...headersJson, ...authHeader(url) },
    withCredentials: true,
  }))().then(handleApiSuccess).catch(handleApiError);
}

function put(url: string, body?: any, config: AxiosRequestConfig={}):Promise<any> {
  return authCall(() => req.put(url, body, {...config,
    headers: { ...headersJson, ...authHeader(url) },
  }))().then(handleApiSuccess).catch(handleApiError);
}

function patch(url: string, body?: any, config: AxiosRequestConfig={}):Promise<any> {
  return authCall(() => req.patch(url, body, {...config,
    headers: { ...headersJson, ...authHeader(url) },
  }))().then(handleApiSuccess).catch(handleApiError);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url: string, config: AxiosRequestConfig={}):Promise<any> {
  return authCall(() => req.delete(url, {...config, headers: authHeader(url)}))()
    .then(handleApiSuccess).catch(handleApiError);
}

function putFile(url: string, key: string, file: any, config: AxiosRequestConfig={}):Promise<any> {
  const data = new FormData();
  data.append(key, file);

  return authCall(() => req.put(url, data, {...config, headers: authHeader(url)}))()
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