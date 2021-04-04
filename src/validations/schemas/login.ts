import { object } from "yup";
import { email } from "../email";
import { passwordValidation } from '../password'
import { recaptchaValidation } from '../recaptcha'

export const loginValidationSchemaFields = {
  email,
  password: passwordValidation,
  recaptcha: recaptchaValidation,
};

export const loginValidationSchema = object().shape(loginValidationSchemaFields);