import {request} from "../../api/request";
import {appConfig} from '../../variables';

let baseUrl = `${appConfig.apiUrl}/www`;

const getWwwUrl = ():string => {
  return baseUrl
}

const setWwwUrl = (url:string) => {
  baseUrl = url;
}

const call_keep_in_touch = ({email}:{email:string}):Promise<string> =>
  request.post(`${baseUrl}/keep_in_touch`, {email});

export const wwwService = {
  getWwwUrl,
  setWwwUrl,
  keep_in_touch: call_keep_in_touch,
}