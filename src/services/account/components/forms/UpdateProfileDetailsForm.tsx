import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import React, { FC, useState } from 'react'
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
import { updateProfilePageTransition } from '../../transitions'

export type UpdateProfileDetailsFormText = {
  updateSuccessful: string;
  firstNameLabel: string;
  lastNameLabel: string;
  phoneLabel: string;
  emailLabel: string;
  confirmEmail: string;
  newsletterLabel: string;
  updateProfile: string;
  pleaseWait: string;
}

export const updateProfileDetailsFormText:UpdateProfileDetailsFormText = {
  updateSuccessful: 'Update successful',
  firstNameLabel: 'Name',
  lastNameLabel: 'Surname',
  phoneLabel: 'Phone number',
  emailLabel: 'Email',
  confirmEmail: 'Confirm email',
  newsletterLabel: 'Receive newsletter',
  updateProfile: 'Update Profile',
  pleaseWait: 'Please wait',
}

export interface IUpdateProfileDetailsForm {
  text?: UpdateProfileDetailsFormText;
}

export const UpdateProfileDetailsForm:FC<IUpdateProfileDetailsForm> = ({text=updateProfileDetailsFormText}) => {
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
        alertService.success(text.updateSuccessful, { timeout: 3 * second });
      })
      .catch(error => alertService.error(error))
      .finally(() => setSubmitting(false));
  });

  const { Fade, Slide } = updateProfilePageTransition;

  return (
    <Grid container component={'form'} className={classes.form} justify={"center"} onSubmit={onSubmit} spacing={3}>

      <Grid item xs={12}>

        <Slide delay={100} transitionProps={{direction:"right", timeout:800, mountOnEnter:true, unmountOnExit:true}}>
          <Fade delay={100} transitionProps={{timeout:800}}>
            <FullNameInput
              //@ts-ignore
              firstNameProps={{label: text.firstNameLabel, error: errors.firstName?.message, inputRef: register, style:{minWidth:250}}}
              //@ts-ignore
              lastNameProps={{label: text.lastNameLabel, error: errors.lastName?.message, inputRef: register}}
              item2Props={{style:{flexGrow: 1}}}
            />
          </Fade>
        </Slide>
      </Grid>

      <Grid item xs={12}>
        <Slide delay={100} transitionProps={{direction:"right", timeout:800, mountOnEnter:true, unmountOnExit:true}}>
          <Fade delay={100} transitionProps={{timeout:800}}>
            <PhoneIti id={"phone"} container={phone_container} initialValue={user?.phone || ""}>
              {/*@ts-ignore*/}
              <PhoneInput label={text.phoneLabel} error={errors.phone?.message} id={"phone"} inputRef={register}/>
            </PhoneIti>
          </Fade>
        </Slide>
      </Grid>

      <Grid item xs={12}>
        <Slide delay={300} transitionProps={{direction:"right", timeout:800, mountOnEnter:true, unmountOnExit:true}}>
          <Fade delay={300} transitionProps={{timeout:800}}>
            {/*@ts-ignore*/}
            <EmailInput error={errors.email?.message} inputRef={register} label={text.emailLabel}/>
          </Fade>
        </Slide>
      </Grid>

      <Grid item xs={12}>
        <Slide delay={400} transitionProps={{direction:"right", timeout:800, mountOnEnter:true, unmountOnExit:true}}>
          <Fade delay={400} transitionProps={{timeout:800}}>
            {/*@ts-ignore*/}
            <EmailInput error={errors.confirmEmail?.message} inputRef={register} label={text.confirmEmail} name={"confirmEmail"}/>
          </Fade>
        </Slide>
      </Grid>

      <Grid item xs={12}>
        <Grid container style={{marginTop: 10, paddingLeft: 2, paddingRight: 2}}>
          <Fade delay={500} transitionProps={{timeout:800}}>
            <CheckboxLabelPrimary
              error={errors.newsletter?.message}
              inputRef={register}
              label={text.newsletterLabel}
              name="newsletter"
            />
          </Fade>
        </Grid>
      </Grid>

      <Grid container justify={"center"} className={classes.actions} style={{paddingTop: 20}}>
        <Fade delay={700} transitionProps={{timeout:800}}>
          <BigRoundSecondaryButton type={"submit"}>
            <BtnLoad loading={isSubmitting} text={text.updateProfile} loadText={text.pleaseWait}/>
          </BigRoundSecondaryButton>
        </Fade>
      </Grid>
    </Grid>
  )
}