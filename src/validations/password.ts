import {string} from "yup";

export const passwordValidation = string()
  .min(8, 'Password must be at least 8 characters')
  .required('Password is required');