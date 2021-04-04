import { object } from "yup";
import { confirmPasswordValidation, passwordValidation } from '../password'

export const resetPasswordValidationSchema = object().shape({
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
});