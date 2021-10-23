import req, { AxiosRequestConfig } from 'axios'
import { handleApiError, handleApiSuccess } from './helpers'
import { headersJson as headers } from './headers'

function get<Response=any>(url: string, config: AxiosRequestConfig={}):Promise<Response> {
  return req.get<Response>(url, config).then(handleApiSuccess).catch(handleApiError);
}

function post<Response=any>(url: string, body?: any, config: AxiosRequestConfig={}):Promise<Response> {
  return req.post<Response>(url, body, { ...config, headers, withCredentials: true }).then(handleApiSuccess).catch(handleApiError);
}

function put<Response=any>(url: string, body?: any, config: AxiosRequestConfig={}):Promise<Response> {
  return req.put<Response>(url, body, { ...config, headers }).then(handleApiSuccess).catch(handleApiError);
}

function patch<Response=any>(url: string, body?: any, config: AxiosRequestConfig={}):Promise<Response> {
  return req.patch<Response>(url, body, { ...config, headers }).then(handleApiSuccess).catch(handleApiError);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete<Response=any>(url: string, config: AxiosRequestConfig={}):Promise<Response> {
  return req.delete<Response>(url, config).then(handleApiSuccess).catch(handleApiError);
}

function putFile<Response=any>(url: string, key: string, file: any, config: AxiosRequestConfig={}):Promise<Response> {
  const data = new FormData();
  data.append(key, file);

  return req.put<Response>(url, data, config)
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