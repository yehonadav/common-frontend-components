import { object } from "yup";
import { loginValidationSchemaFields } from "./login";
import { confirmEmailValidation } from '../email'
import { confirmPasswordValidation } from '../password'
import { acceptTermsValidation } from '../acceptTerms'
import { newsletterValidation } from '../newsletter'


export const signupValidationSchemaFields = {
  ...loginValidationSchemaFields,
  confirmEmail: confirmEmailValidation,
  confirmPassword: confirmPasswordValidation,
  acceptTerms: acceptTermsValidation,
  newsletter: newsletterValidation,
};

export const signupValidationSchema = object().shape(signupValidationSchemaFields);