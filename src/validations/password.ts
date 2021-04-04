import {string, ref} from "yup";

export const passwordValidation = string()
  .min(8, 'Password must be at least 8 characters')
  .required('Password is required');

export const confirmPasswordValidation = string()
  .when('password', (password:string, schema:any) => {
    if (password)
      return schema.required('Confirm Password is required')
  })
  .oneOf([ref('password')], 'Passwords must match');
