import {string, ref} from "yup";

// deprecated
export const email = string()
  .email('Email is invalid')
  .required('Email is required');

export const emailValidation = email;

export const confirmEmailValidation = string()
  .oneOf([ref('email'), null], 'Emails must match')
  .required('Confirm Email is required');
