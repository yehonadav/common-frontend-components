import { string } from 'yup'

export const lastNameValidation = string()
  .required('Last Name is required');