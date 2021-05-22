import React, {createRef, FC, useState} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupValidationSchema } from '../../../validations'
import { alertService } from '../../alert'
import { call_register } from '../api'
import { accountLinks } from '../accountLinks'
import { usePageLayoutStyles } from '../../../assets/jss/pageLayoutStyles'
import Grid from '@material-ui/core/Grid'
import { BigRoundSecondaryButton, BtnLoad, EmailInput, PasswordInput, Recaptcha } from '../../../components'
import { CheckboxLabelPrimary } from '../../../components'
import { routes } from '../../../variables'
import { colors } from '../../theme'
import {Link} from "react-router-dom";

export const ownerDefaultValues = {
  phone: '',
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
  newsletter: false,
  recaptcha: undefined,
};

const RegisterPage:FC = () => {
  const [isSubmitting, setSubmitting] = useState(false);

  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(signupValidationSchema),
    defaultValues: ownerDefaultValues,
  });

  const onSubmit = handleSubmit((fields: { phone: any; confirmEmail: any}) => {
    setSubmitting(true);

    const data = {...fields};
    delete data.confirmEmail;

    const el = document.getElementById("recaptcha");

    if (!el)
      return alertService.error("failed to get re-captcha response");

    // @ts-ignore
    data.recaptcha = el.value;

    call_register(data)
      .then(() => {
        alertService.success('Registration successful, please check your email for verification instructions');
        accountLinks.go_to_signin();
      })
      .catch(error => {
        alertService.error(error);
      })
      .finally(() => {
        // @ts-ignore
        recaptchaRef.current?.reset();
        setSubmitting(false);
      });
  }, (errors) => {
    console.error({errors});
    // @ts-ignore
    recaptchaRef.current?.reset();
  });

  const recaptchaRef = createRef();

  const classes = usePageLayoutStyles();

  return (
    <Grid container component={'form'} className={classes.form} style={{maxWidth: 600}} justify={"center"} onSubmit={onSubmit} spacing={3}>

      <div style={{width:"100%", height: 30}}/>

      <Grid item xs={12}>
        <EmailInput error={errors.email?.message} inputRef={register} fullWidth/>
      </Grid>

      <Grid item xs={12}>
        <EmailInput error={errors.confirmEmail?.message} inputRef={register} fullWidth label={"Confirm email"} name={"confirmEmail"}/>
      </Grid>

      <Grid item xs={12}>
        <PasswordInput error={errors.password?.message} inputRef={register} fullWidth/>
      </Grid>

      <Grid item xs={12}>
        <PasswordInput error={errors.confirmPassword?.message} inputRef={register} fullWidth label={"Confirm password"} name={"confirmPassword"}/>
      </Grid>

      <Grid item xs={12}>
        <Grid container style={{paddingLeft: 2, paddingRight: 2}}>
          <CheckboxLabelPrimary
            error={errors.acceptTerms?.message}
            inputRef={register}
            label={<>I accept <Link to={routes.terms} style={{color: colors.primary, padding: '0 6px 3px', border: 'none'}}>Terms & Conditions</Link></>}
            name="acceptTerms"
          />
        </Grid>

        <Grid container style={{marginTop: 10, paddingLeft: 2, paddingRight: 2}}>
          <CheckboxLabelPrimary
            error={errors.newsletter?.message}
            inputRef={register}
            label="Receive newsletter"
            name="newsletter"
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Recaptcha setValue={setValue} error={errors.recaptcha?.message} recaptchaRef={recaptchaRef}/>
      </Grid>

      <Grid container justify={"center"} className={classes.actions} style={{paddingTop: 30}}>
        <BigRoundSecondaryButton type={"submit"}>
          <BtnLoad loading={isSubmitting} text={"Sign Up"}/>
        </BigRoundSecondaryButton>
      </Grid>

      <Link to={routes.signin} className={classes.cancel}>Already have an account ?<br/>Sign In</Link>

    </Grid>
  )
}

export { RegisterPage };