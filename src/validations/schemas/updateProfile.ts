import {bool, object, ref, string} from "yup";
import {phone} from "../phone";

const createUpdateProfileValidationSchema = (phone_container:{iti?:any}) => object().shape({
  firstName: string().required('First Name is required'),
  lastName: string().required('Last Name is required'),
  email: string().email('Email is invalid').required('Email is required'),
  phone: phone(phone_container),
  newsletter: bool().oneOf([true, false], 'Do you want to receive newsletters?'),
});

const updatePasswordValidationSchema = object().shape({
  password: string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: string().when('password', (password:string, schema:any) => {
    if (password)
      return schema.required('Confirm Password is required')
  }).oneOf([ref('password')], 'Passwords must match'),
});

export {
  createUpdateProfileValidationSchema,
  updatePasswordValidationSchema,
}