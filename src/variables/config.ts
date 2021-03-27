const apiLocal = 'http://localhost:4000/dev';
const apiRemote = '';

const apiUrl = process.env.REACT_APP_STAGE === 'local' ? apiLocal : apiRemote;

export const config = {
  apiUrl,
  reCaptchaSiteKey: '',
  googleLoginClientId: '',
  google_maps_key: '',
  ipinfo_token: "",
  company: '',
  website: '',
  app_name: '',
  app_slogan: '',
  app_description: '',
  terms_last_update: "",
};