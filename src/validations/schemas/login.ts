import { object, mixed } from "yup";
import { email } from "../email";
import { passwordValidation } from '../password'

export const loginValidationSchema = object().shape({
  email,

  password: passwordValidation,

  recaptcha: mixed().test("recaptcha", "Please verify you are not a bot", () => {
    const el = document.getElementById("recaptcha");
    if (!el) return false;
    // @ts-ignore
    return !!el.value;
  }),

});