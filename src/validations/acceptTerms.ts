import {bool} from "yup";

export const acceptTermsValidation = bool()
  .oneOf([true], 'Accept TermsPage & Conditions is required')
  .required('You must accept TermsPage & Conditions first');
