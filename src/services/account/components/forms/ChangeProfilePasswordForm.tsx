import React, { FC, useState } from 'react'
import Grid from "@material-ui/core/Grid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BigRoundPrimaryButton, BtnLoad, PasswordInput } from '../../../../components'
import { usePageLayoutStyles } from '../../../../assets/jss/pageLayoutStyles'
import { useUser } from '../../hooks'
import { updatePasswordValidationSchema } from '../../../../validations'
import { accountService } from '../../service'
import { alertService } from '../../../alert'
import { seconds } from '@yehonadav/timeunit'

export type ChangeProfilePasswordFormText = {
  updateSuccessful: string;
  passwordLabel: string;
  confirmPassword: string;
  changePassword: string;
  pleaseWait: string;
}

export const changeProfilePasswordFormText:ChangeProfilePasswordFormText = {
  updateSuccessful: 'Password Changed!',
  passwordLabel: 'Password',
  confirmPassword: 'Confirm password',
  changePassword: 'Change Password',
  pleaseWait: 'Please wait',
}

export interface IChangeProfilePasswordForm {
  text?: ChangeProfilePasswordFormText;
}

export const ChangeProfilePasswordForm:FC<IChangeProfilePasswordForm> = ({text=changeProfilePasswordFormText}) => {
  const classes = usePageLayoutStyles();
  const user = useUser();

  const [isSubmitting, setSubmitting] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(updatePasswordValidationSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    }
  });

  const onSubmit = handleSubmit((fields) => {
    if (!user)
      return;

    setSubmitting(true);

    accountService.update(user.id, fields)
      .then(() => {
        alertService.success(text.updateSuccessful, { timeout: 3 * seconds });
      })
      .catch(error => alertService.error(error))
      .finally(() => setSubmitting(false));
  });

  return (
    <Grid container component={'form'} className={classes.form} justify={"center"} onSubmit={onSubmit} spacing={3}>

      <Grid item xs={12}>
        {/*@ts-ignore*/}
        <PasswordInput error={errors.password?.message} inputRef={register} fullWidth lebel={text.passwordLabel}/>
      </Grid>

      <Grid item xs={12}>
        {/*@ts-ignore*/}
        <PasswordInput error={errors.confirmPassword?.message} inputRef={register} fullWidth label={text.confirmPassword} name={"confirmPassword"}/>
      </Grid>

      <Grid container justify={"center"} className={classes.actions} style={{paddingTop: 30}}>
        <BigRoundPrimaryButton type={"submit"}>
          <BtnLoad loading={isSubmitting} text={text.changePassword} loadText={text.pleaseWait}/>
        </BigRoundPrimaryButton>
      </Grid>
    </Grid>
  )
}