import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import React, {ReactElement, useState} from "react";
import Grid from "@material-ui/core/Grid";
import { BigRoundPrimaryButton, BtnLoad, PasswordInput } from '../../../../components'
import { usePageLayoutStyles } from '../../../../assets/jss/pageLayoutStyles'
import { useUser } from '../../hooks'
import { updatePasswordValidationSchema } from '../../../../validations'
import { accountService } from '../../service'
import { alertService } from '../../../alert'
import { seconds } from '@yehonadav/timeunit'

export const ChangeProfilePasswordForm = ():ReactElement => {
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
        alertService.success('Password Changed!', { timeout: 3 * seconds });
      })
      .catch(error => alertService.error(error))
      .finally(() => setSubmitting(false));
  });

  return (
    <Grid container component={'form'} className={classes.form} justify={"center"} onSubmit={onSubmit} spacing={3}>

      <Grid item xs={12}>
        {/*@ts-ignore*/}
        <PasswordInput error={errors.password?.message} inputRef={register} fullWidth/>
      </Grid>

      <Grid item xs={12}>
        {/*@ts-ignore*/}
        <PasswordInput error={errors.confirmPassword?.message} inputRef={register} fullWidth label={"Confirm password"} name={"confirmPassword"}/>
      </Grid>

      <Grid container justify={"center"} className={classes.actions} style={{paddingTop: 30}}>
        <BigRoundPrimaryButton type={"submit"}>
          <BtnLoad loading={isSubmitting} text={"Change Password"}/>
        </BigRoundPrimaryButton>
      </Grid>
    </Grid>
  )
}