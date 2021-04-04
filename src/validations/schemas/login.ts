import { object } from "yup";
import { email } from "../email";
import { passwordValidation } from '../password'
import { recaptchaValidation } from '../recaptcha'

export const loginValidationSchema = object().shape({
  email,
  password: passwordValidation,
  recaptcha: recaptchaValidation,
});