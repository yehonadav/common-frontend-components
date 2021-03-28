import {string} from "yup";

export const email = string()
  .email('Email is invalid')
  .required('Email is required');