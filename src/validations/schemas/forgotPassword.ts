import { emailValidation } from "../email";
import { object } from "yup";

export const forgotPasswordValivationSchema = object().shape({
  email: emailValidation,
});