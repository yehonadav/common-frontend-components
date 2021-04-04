import { object } from "yup";
import { emailValidation } from "../email";
import { passwordValidation } from '../password'
import { recaptchaValidation } from '../recaptcha'

export const loginValidationSchemaFields = {
  email: emailValidation,
  password: passwordValidation,
  recaptcha: recaptchaValidation,
};

export const loginValidationSchema = object().shape(loginValidationSchemaFields);