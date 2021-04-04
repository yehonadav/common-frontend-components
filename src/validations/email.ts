import {string, ref} from "yup";

export const email = string()
  .email('Email is invalid')
  .required('Email is required');

export const confirmEmailValidation = string()
  .oneOf([ref('email'), null], 'Emails must match')
  .required('Confirm Email is required');
