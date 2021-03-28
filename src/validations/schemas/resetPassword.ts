import {object, ref, string} from "yup";

export const resetPasswordValidationSchema = object().shape({
  password: string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  // @ts-ignore
  confirmPassword: string().oneOf([ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});