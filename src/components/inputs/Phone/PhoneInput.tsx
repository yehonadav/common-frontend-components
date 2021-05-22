import {FormInput} from "../FormInput";
import React, {FC} from "react";
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import { InputPropsType } from '../../../types'

export const PhoneInput:FC<InputPropsType> = ({error, ...props}) => {
  return (
    <FormInput
      id="phone"
      icon={<PhoneAndroidIcon />}
      error={error}
      label="Phone"
      name="phone"
      type="tel"
      {...props}
    />
  )
};