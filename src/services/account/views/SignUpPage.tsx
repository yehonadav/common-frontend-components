import React, {createRef, FC, useState} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupValidationSchema } from '../../../validations'
import { alertService } from '../../alert'
import { call_register } from '../api'
import { usePageLayoutStyles } from '../../../assets/jss/pageLayoutStyles'
import Grid from '@material-ui/core/Grid'
import { BigRoundSecondaryButton, BtnLoad, EmailInput, PasswordInput, Recaptcha } from '../../../components'
import { CheckboxLabelPrimary } from '../../../components'
import { colors } from '../../theme'
import { signUpPageTransition } from '../transitions'
import { LinkInText } from '../components/LinkInText'
import { pageTransitions } from '../../../utils'
import { accountPageTransitions } from '../accountRoutes'
import { setRegisteredOnce } from '../stores'

const { Slide, Fade } = signUpPageTransition;

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

  signUpPageTransition.useSetOnLoad();

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
        setRegisteredOnce(true);
        accountPageTransitions.signin();
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
              <EmailInput error={errors.confirmEmail?.message} inputRef={register} fullWidth label={text.confirmEmailLabel} name={"confirmEmail"}/>
            </Fade>
          </Slide>
        </Grid>

        <Grid item xs={12}>
          <Slide delay={300} transitionProps={{direction:"right", timeout:800, mountOnEnter:true, unmountOnExit:true}}>
            <Fade delay={300} transitionProps={{timeout:800}}>
              <PasswordInput error={errors.password?.message} inputRef={register} fullWidth label={text.passwordLabel}/>
            </Fade>
          </Slide>
        </Grid>

        <Grid item xs={12}>
          <Slide delay={400} transitionProps={{direction:"right", timeout:800, mountOnEnter:true, unmountOnExit:true}}>
            <Fade delay={400} transitionProps={{timeout:800}}>
              <PasswordInput error={errors.confirmPassword?.message} inputRef={register} fullWidth label={text.confirmPassword} name={"confirmPassword"}/>
            </Fade>
          </Slide>
        </Grid>

        <Grid item xs={12}>
          <Grid container style={{paddingLeft: 2, paddingRight: 2}}>
            <Fade delay={500} transitionProps={{timeout:800}}>
              <CheckboxLabelPrimary
                error={errors.acceptTerms?.message}
                inputRef={register}
                label={<>{text.iAccept} <LinkInText onClick={pageTransitions.go_to_terms} style={{color: colors.primary, padding: '0 6px 3px', border: 'none'}}>{text.terms}</LinkInText></>}
                name="acceptTerms"
              />
            </Fade>
          </Grid>

          <Grid container style={{marginTop: 10, paddingLeft: 2, paddingRight: 2}}>
            <Fade delay={600} transitionProps={{timeout:800}}>
            <CheckboxLabelPrimary
              error={errors.newsletter?.message}
              inputRef={register}
              label={text.newsletterLabel}
              name="newsletter"
            />
            </Fade>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Fade delay={700} transitionProps={{timeout:800}}>
            <Recaptcha setValue={setValue} error={errors.recaptcha?.message} recaptchaRef={recaptchaRef}/>
          </Fade>
        </Grid>

        <Grid container justify={"center"} className={classes.actions} style={{paddingTop: 30}}>
          <Fade delay={900} transitionProps={{timeout:800}}>
            <BigRoundSecondaryButton type={"submit"}>
              <BtnLoad loading={isSubmitting} text={text.signUp} loadText={text.pleaseWait}/>
            </BigRoundSecondaryButton>
          </Fade>
        </Grid>

        <Fade delay={1300} transitionProps={{timeout:800}}>
          <div onClick={accountPageTransitions.signin} className={classes.cancel}>
            {text.alreadyHaveAnAccount}<br/>
            {text.signIn}
          </div>
        </Fade>
      </Grid>
    </Fade>
  )
}

export { SignUpPage };