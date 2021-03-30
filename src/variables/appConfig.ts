export type TappConfig = {
  // servers urls
  apiUrl?: string;
  accountUrl?: string;
  wwwUrl?: string;
  versionUrl?: string;

  // tokens
  reCaptchaSiteKey?: string;
  googleLoginClientId?: string;
  google_maps_key?: string;
  ipinfo_token?: string;

  // app details
  company?: string;
  website?: string;
  app_name?: string;
  app_slogan?: string;
  app_description?: string;
  terms_last_update?: string;
  logo?: string;

  // global app variables
  desktopMinWidth?: number;

  // dynamic additional variables
  [x:string]: any;
}

export const appConfig: TappConfig = {};