import req, { AxiosRequestConfig } from 'axios'
import { handleApiError, handleApiSuccess } from './helpers'
import { headersJson as headers } from './headers'

function get(url: string, config: AxiosRequestConfig={}):Promise<any> {
  return req.get(url, config).then(handleApiSuccess).catch(handleApiError);
}

function post(url: string, body?: any, config: AxiosRequestConfig={}):Promise<any> {
  return req.post(url, body, { ...config, headers, withCredentials: true }).then(handleApiSuccess).catch(handleApiError);
}

function put(url: string, body?: any, config: AxiosRequestConfig={}):Promise<any> {
  return req.put(url, body, { ...config, headers }).then(handleApiSuccess).catch(handleApiError);
}

function patch(url: string, body?: any, config: AxiosRequestConfig={}):Promise<any> {
  return req.patch(url, body, { ...config, headers }).then(handleApiSuccess).catch(handleApiError);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url: string, config: AxiosRequestConfig={}):Promise<any> {
  return req.delete(url, config).then(handleApiSuccess).catch(handleApiError);
}

function putFile(url: string, key: string, file: any, config: AxiosRequestConfig={}):Promise<any> {
  const data = new FormData();
  data.append(key, file);

  return req.put(url, data, config)
    .then(handleApiSuccess)
    .catch(handleApiError);
}

export const request = {
  get,
  post,
  put,
  delete: _delete,
  putFile,
  patch,
};