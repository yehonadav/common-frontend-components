import { string } from "yup";
import {ItiContainerType} from "../types";

// export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const phoneRegExp = /^\+[1-9]\d{10,14}$/;

export const phone = (container: ItiContainerType, message='Valid phone number required') => string().test('phone', message, function(_value) {
  const { path, createError } = this;
  // [value] - value of the property being tested
  // [path]  - property name,

  const {iti} = container;
  return (iti && iti.getNumber && iti.isValidNumber()) || createError({path, message});
});

export const phoneOptional = (container: ItiContainerType, message='Valid phone number required') => string().test('phone', message, function(_value) {
  const { path, createError } = this;
  // [value] - value of the property being tested
  // [path]  - property name,

  const {iti} = container;
  if (iti && iti.getNumber) {
    const number = iti.getNumber();
    if (number === "" || iti.isValidNumber())
      return true
  }
  return createError({path, message});
});

export const getNumber = (container: { iti?: any; }, value: any) => {
  const {iti} = container;
  return (iti && iti.getNumber)
    ? iti.getNumber()
    : value
};

export const setNumber = (container: { iti: any; }, value: any) => {
  const {iti} = container;
  if (iti && iti.setNumber) {
    try {
      iti.setNumber(value);
    } catch (e) {
      console.error('setNumber failed:', e);
    }
  }
};
