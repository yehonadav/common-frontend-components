import {object} from "yup";
import {phone} from "../phone";
import { firstNameValidation } from '../firstName'
import { lastNameValidation } from '../lastName'
import { email } from '../email'
import { newsletterValidation } from '../newsletter'
import { confirmPasswordValidation, passwordValidation } from '../password'
import { ItiContainerType } from '../../types'

const createUpdateProfileValidationSchema = (phone_container:ItiContainerType) => object().shape({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  email,
  phone: phone(phone_container),
  newsletter: newsletterValidation,
});

const updatePasswordValidationSchema = object().shape({
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
});

export {
  createUpdateProfileValidationSchema,
  updatePasswordValidationSchema,
}