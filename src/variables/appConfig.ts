export type TappConfig = {
  logo: string;
  apiUrl: string;
  reCaptchaSiteKey: string;
  googleLoginClientId: string;
  google_maps_key: string;
  ipinfo_token: string;
  company: string;
  website: string;
  app_name: string;
  app_slogan: string;
  app_description: string;
  terms_last_update: string;
  desktopMinWidth: number;
  [x:string]: any;
}

export const appConfig: TappConfig = {
  logo: "",
  apiUrl: "",
  reCaptchaSiteKey: "",
  googleLoginClientId: "",
  google_maps_key: "",
  ipinfo_token: "",
  company: "",
  website: "",
  app_name: "",
  app_slogan: "",
  app_description: "",
  terms_last_update: "",
  desktopMinWidth: 1200,
};