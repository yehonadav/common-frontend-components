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

export type SignUpPageText = {
  failedToGetRecaptchaResponse: string;
  registerSuccessMsg: string;
  alreadyHaveAnAccount: string;
  signUp: string;
  signIn: string;
  emailLabel: string;
  confirmEmailLabel: string;
  passwordLabel: string;
  confirmPassword: string;
  iAccept: string;
  terms: string;
  newsletterLabel: string;
  pleaseWait: string;
}

const signUpPageDefaultText:SignUpPageText = {
  failedToGetRecaptchaResponse: "failed to get re-captcha response",
  registerSuccessMsg: 'Registration successful, please check your email for verification instructions',
  alreadyHaveAnAccount: "Already have an account ?",
  signUp: "Sign Up",
  signIn: "Sign In",
  emailLabel: "email",
  confirmEmailLabel: "Confirm email",
  passwordLabel: "password",
  confirmPassword: "Confirm password",
  iAccept: "I accept",
  terms: "Terms & Conditions",
  newsletterLabel: "Receive newsletter",
  pleaseWait: 'Please wait',
}

export interface ISignUpPage {
  text?: SignUpPageText;
}

const SignUpPage:FC<ISignUpPage> = ({text=signUpPageDefaultText}) => {
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
      return alertService.error(text.failedToGetRecaptchaResponse);

    // @ts-ignore
    data.recaptcha = el.value;

    call_register(data)
      .then(() => {
        alertService.success(text.registerSuccessMsg);
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
    <Grid container component={'form'} className={classes.form} style={{maxWidth: 600, textAlign: 'start'}} justify={"center"} onSubmit={onSubmit} spacing={3}>

      <div style={{width:"100%", height: 30}}/>

      <Grid item xs={12}>
        <EmailInput error={errors.email?.message} inputRef={register} fullWidth label={text.emailLabel}/>
      </Grid>

      <Grid item xs={12}>
        <EmailInput error={errors.confirmEmail?.message} inputRef={register} fullWidth label={text.confirmEmailLabel} name={"confirmEmail"}/>
      </Grid>

      <Grid item xs={12}>
        <PasswordInput error={errors.password?.message} inputRef={register} fullWidth label={text.passwordLabel}/>
      </Grid>

      <Grid item xs={12}>
        <PasswordInput error={errors.confirmPassword?.message} inputRef={register} fullWidth label={text.confirmPassword} name={"confirmPassword"}/>
      </Grid>

      <Grid item xs={12}>
        <Grid container style={{paddingLeft: 2, paddingRight: 2}}>
          <CheckboxLabelPrimary
            error={errors.acceptTerms?.message}
            inputRef={register}
            label={<>{text.iAccept} <Link to={routes.terms} style={{color: colors.primary, padding: '0 6px 3px', border: 'none'}}>{text.terms}</Link></>}
            name="acceptTerms"
          />
        </Grid>

        <Grid container style={{marginTop: 10, paddingLeft: 2, paddingRight: 2}}>
          <CheckboxLabelPrimary
            error={errors.newsletter?.message}
            inputRef={register}
            label={text.newsletterLabel}
            name="newsletter"
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Recaptcha setValue={setValue} error={errors.recaptcha?.message} recaptchaRef={recaptchaRef}/>
      </Grid>

      <Grid container justify={"center"} className={classes.actions} style={{paddingTop: 30}}>
        <BigRoundSecondaryButton type={"submit"}>
          <BtnLoad loading={isSubmitting} text={text.signUp} loadText={text.pleaseWait}/>
        </BigRoundSecondaryButton>
      </Grid>

      <Link to={routes.signin} className={classes.cancel} style={{textAlign: 'center'}}>
        {text.alreadyHaveAnAccount}<br/>
        {text.signIn}
      </Link>

    </Grid>
  )
}

export { SignUpPage };