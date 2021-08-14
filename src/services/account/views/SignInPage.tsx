import React, {createRef, FC, useState} from 'react';
import {useHistory} from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidationSchema } from '../../../validations'
import { alertService } from '../../alert'
import { accountService } from '../service'
import { getLocation } from '../../router'
import { usePageLayoutStyles } from '../../../assets/jss/pageLayoutStyles'
import Grid from '@material-ui/core/Grid'
import { BigRoundSecondaryButton, BtnLoad, EmailInput, PasswordInput, Recaptcha } from '../../../components'
import { routes } from '../../../variables'
import { signInPageTransition } from '../transitions'
import { accountLinks } from '../accountLinks'
import { ForgotPasswordTextHelper } from '../components/ForgotPasswordTextHelper'

const { Slide, Fade } = signInPageTransition;

export type SignInPageText = {
  failedToGetRecaptchaResponse: string;
  forgotPassword: string;
  dontHaveAnAccount: string;
  signUp: string;
  signIn: string;
  emailLabel: string;
  passwordLabel: string;
  pleaseWait: string;
}

const signInPageDefaultText:SignInPageText = {
  failedToGetRecaptchaResponse: "failed to get re-captcha response",
  forgotPassword: "Forgot password",
  dontHaveAnAccount: "Don't have an account ?",
  signUp: "Sign Up",
  signIn: "Sign In",
  emailLabel: "email",
  passwordLabel: "password",
  pleaseWait: 'Please wait',
}

export interface ISignInPage {
  text?: SignInPageText;
}

const defaultValues = {
  email: '',
  password: '',
  recaptcha: undefined,
};

export const SignInPage:FC<ISignInPage> = ({text=signInPageDefaultText}) => {
  const history = useHistory();

  signInPageTransition.useSetOnLoad();

  const [isSubmitting, setSubmitting] = useState(false);

  const recaptchaRef = createRef();

  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(loginValidationSchema),
    defaultValues,
  });

  const onSubmit = handleSubmit((fields: any) => {
    setSubmitting(true);

    const data = {...fields};

    const el = document.getElementById("recaptcha");

    if (!el)
      return alertService.error(text.failedToGetRecaptchaResponse);

    // @ts-ignore
    data.recaptcha = el.value;

    accountService.login(data.email, data.password, data.recaptcha)
      .then(() => {
        // @ts-ignore
        const { from } = getLocation().state || { from: { pathname: routes.home } };
        history.push(from);
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

  const classes = usePageLayoutStyles();

  return (
    <Fade transitionProps={{timeout:800}} divProps={{className:classes.formContainer}}>
      <Grid container component={'form'} className={classes.form} justify={"center"} onSubmit={onSubmit} spacing={3}>
        <Grid item xs={12}>
          <Slide delay={100} transitionProps={{direction:"right", timeout:800, mountOnEnter:true, unmountOnExit:true}}>
            <Fade delay={100} transitionProps={{timeout:800}}>
              <EmailInput error={errors.email?.message} inputRef={register} fullWidth label={text.emailLabel}/>
            </Fade>
          </Slide>
        </Grid>

        <Grid item xs={12}>
          <Slide delay={200} transitionProps={{direction:"right", timeout:800, mountOnEnter:true, unmountOnExit:true}}>
            <Fade delay={200} transitionProps={{timeout:800}}>
              <PasswordInput error={errors.password?.message} inputRef={register} fullWidth label={text.passwordLabel}/>
              <div style={{display:"flex", marginTop:5}}>
                <ForgotPasswordTextHelper onClick={()=>{signInPageTransition.exit(500).then(accountLinks.go_to_forgot_password)}}>
                  {text.forgotPassword}
                </ForgotPasswordTextHelper>
              </div>
            </Fade>
          </Slide>
        </Grid>

        <Grid item xs={12}>
          <Fade delay={300} transitionProps={{timeout:800}}>
            <Recaptcha setValue={setValue} error={errors.recaptcha?.message} recaptchaRef={recaptchaRef}/>
          </Fade>
        </Grid>

        <Grid container justify={"center"} className={classes.actions} style={{paddingTop: 30}}>
          <Fade delay={500} transitionProps={{timeout:800}}>
            <BigRoundSecondaryButton type={"submit"}>
              <BtnLoad loading={isSubmitting} text={text.signIn} loadText={text.pleaseWait}/>
            </BigRoundSecondaryButton>
          </Fade>
        </Grid>

        <Fade delay={800} transitionProps={{timeout:800}}>
          <div onClick={()=>{signInPageTransition.exit(500).then(accountLinks.go_to_signup)}} className={classes.cancel}>
            {text.dontHaveAnAccount}<br/>
            {text.signUp}
          </div>
        </Fade>

      </Grid>
    </Fade>
  )
}
