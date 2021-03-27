import {appConfig, TappConfig} from "../variables"

export const setAppConfig = (props:Partial<TappConfig>):TappConfig => {
  Object.assign(appConfig, props);
  return appConfig;
}