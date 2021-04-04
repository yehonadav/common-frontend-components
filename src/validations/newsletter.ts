import {bool} from "yup";

export const newsletterValidation = bool()
  .oneOf([true, false], 'Do you want to receive newsletters?');
