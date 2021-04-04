import { string } from 'yup'

export const firstNameValidation = string()
  .required('First Name is required');