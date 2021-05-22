import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import React, {ReactElement, useState} from "react";
import Grid from "@material-ui/core/Grid";
import { createUpdateProfileValidationSchema, getNumber } from '../../../../validations'
import { useContainer } from '../../../../hooks'
import { usePageLayoutStyles } from '../../../../assets/jss/pageLayoutStyles'
import { useUser } from '../../hooks'
import {
  BigRoundSecondaryButton, BtnLoad,
  CheckboxLabelPrimary,
  EmailInput,
  FullNameInput, PhoneInput,
  PhoneIti
} from '../../../../components'
import { alertService } from '../../../alert'
import { accountService } from '../../service'
import { useMobile } from '../../../../stores'
import { second } from '@yehonadav/timeunit'

export const UpdateProfileDetailsForm = ():ReactElement => {
  const isMobile = useMobile();

  const classes = usePageLayoutStyles();
  const user = useUser();

  const phone_container = useContainer();
  const [isSubmitting, setSubmitting] = useState(false);

  const updateProfileValidationSchema = createUpdateProfileValidationSchema(phone_container);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(updateProfileValidationSchema),
    defaultValues: {
      phone: user ? user.phone: "",
      firstName: user ? user.firstName: "",
      lastName: user ? user.lastName: "",
      email: user ? user.email: "",
      newsletter: user ? user.newsletter: false,
    }
  });

  const onSubmit = handleSubmit((fields) => {
    if (!user)
      return;

    setSubmitting(true);

    const data = {...fields};
    data.phone = getNumber(phone_container, fields.phone);

    accountService.update(user.id, data)
      .then(() => {
        alertService.success('Update successful', { timeout: 3 * second });
      })
      .catch(error => alertService.error(error))
      .finally(() => setSubmitting(false));
  });

  return (
    <Grid container component={'form'} className={classes.form} justify={"center"} onSubmit={onSubmit} spacing={3}>

      <Grid item xs={12}>
        <FullNameInput
          //@ts-ignore
          firstNameProps={{error: errors.firstName?.message, inputRef: register, fullWidth: !!isMobile, style:{minWidth:250}}}
          //@ts-ignore
          lastNameProps={{error: errors.lastName?.message, inputRef: register, fullWidth: true}}
          item2Props={{style:{flexGrow: 1}}}
        />
      </Grid>

      <Grid item xs={12}>
        <PhoneIti id={"phone"} container={phone_container} initialValue={user?.phone || ""}>
          {/*@ts-ignore*/}
          <PhoneInput label={"Phone number"} error={errors.phone?.message} id={"phone"} fullWidth inputRef={register}/>
        </PhoneIti>
      </Grid>

      <Grid item xs={12}>
        {/*@ts-ignore*/}
        <EmailInput error={errors.email?.message} inputRef={register} fullWidth/>
      </Grid>

      <Grid item xs={12}>
        {/*@ts-ignore*/}
        <EmailInput error={errors.confirmEmail?.message} inputRef={register} fullWidth label={"Confirm email"} name={"confirmEmail"}/>
      </Grid>

      <Grid item xs={12}>
        <Grid container style={{marginTop: 10, paddingLeft: 2, paddingRight: 2}}>
          <CheckboxLabelPrimary
            error={errors.newsletter?.message}
            inputRef={register}
            label="Receive newsletter"
            name="newsletter"
          />
        </Grid>
      </Grid>

      <Grid container justify={"center"} className={classes.actions} style={{paddingTop: 30}}>
        <BigRoundSecondaryButton type={"submit"}>
          <BtnLoad loading={isSubmitting} text={"Update Profile"}/>
        </BigRoundSecondaryButton>
      </Grid>
    </Grid>
  )
}