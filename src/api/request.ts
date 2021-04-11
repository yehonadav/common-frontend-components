import req from 'axios'
import { handleApiError, handleApiSuccess } from './helpers'
import { headersJson as headers } from './headers'

function get(url: string):Promise<any> {
  return req.get(url).then(handleApiSuccess).catch(handleApiError);
}

function post(url: string, body: Record<string, unknown>):Promise<any> {
  return req.post(url, body, { headers, withCredentials: true }).then(handleApiSuccess).catch(handleApiError);
}

function put(url: string, body: Record<string, unknown>):Promise<any> {
  return req.put(url, body, { headers }).then(handleApiSuccess).catch(handleApiError);
}

function patch(url: string, body: Record<string, unknown>):Promise<any> {
  return req.patch(url, body, { headers }).then(handleApiSuccess).catch(handleApiError);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url: string):Promise<any> {
  return req.delete(url).then(handleApiSuccess).catch(handleApiError);
}

function putFile(url: string, key: string, file: any):Promise<any> {
  const data = new FormData();
  data.append(key, file);

  return req.put(url, data)
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