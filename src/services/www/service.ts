import {request} from '../../api';
import {appConfig} from '../../variables';

const call_keep_in_touch = ({email}:{email:string}):Promise<string> =>
  request.post(`${appConfig.wwwUrl}/keep_in_touch`, {email});

const call_subscribe = (body:any):Promise<string> =>
  request.post(`${appConfig.wwwUrl}/subscribe`, body);

export const wwwService = {
  keep_in_touch: call_keep_in_touch,
  subscribe: call_subscribe,
}