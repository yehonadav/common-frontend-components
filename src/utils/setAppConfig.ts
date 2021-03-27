import {appConfig} from "../variables"

export interface IsetAppConfigProps {
  apiUrl: string;
  [x:string]: any;
}

export const setAppConfig = (props:IsetAppConfigProps) => {
  Object.assign(appConfig, props);
}