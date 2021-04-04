import {mixed} from "yup";

export const recaptchaValidation = mixed().test("recaptcha", "Please verify you are not a bot", ()=>{
  const el = document.getElementById("recaptcha");
  if (!el) return false;
  // @ts-ignore
  return !!el.value;
})