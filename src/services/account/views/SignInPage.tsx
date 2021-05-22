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
import { accountRoutes } from '../accountRoutes'
import {Link} from "react-router-dom";
import { routes } from '../../../variables'

export const SignInPage:FC = () => {
  const history = useHistory();

  const [isSubmitting, setSubmitting] = useState(false);

  const recaptchaRef = createRef();

  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
      recaptcha: undefined,
    },
  });

  const onSubmit = handleSubmit((fields: any) => {
    setSubmitting(true);

    const data = {...fields};

    const el = document.getElementById("recaptcha");

    if (!el)
      return alertService.error("failed to get re-captcha response");

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
    <Grid container component={'form'} className={classes.form} style={{padding: 20}} justify={"center"} onSubmit={onSubmit} spacing={3}>
      <Grid container justify={"center"}>
        <Grid container spacing={3} style={{maxWidth: 650}}>

          <Grid item xs={12}>
            <EmailInput error={errors.email?.message} inputRef={register} fullWidth/>
          </Grid>

          <Grid item xs={12}>
            <PasswordInput error={errors.password?.message} inputRef={register} fullWidth/>
            <div style={{display:"flex", marginTop:5}}><Link to={accountRoutes.forgot_password}>Forgot password</Link></div>
          </Grid>

          <Grid item xs={12}>
            <Recaptcha setValue={setValue} error={errors.recaptcha?.message} recaptchaRef={recaptchaRef}/>
          </Grid>
        </Grid>
      </Grid>

      <Grid container justify={"center"} className={classes.actions} style={{paddingTop: 30}}>
        <BigRoundSecondaryButton type={"submit"}>
          <BtnLoad loading={isSubmitting} text={"Sign In"}/>
        </BigRoundSecondaryButton>
      </Grid>

      <Link to={accountRoutes.signup} className={classes.cancel}>Don't have an account ?<br/>Sign Up</Link>

    </Grid>
  )
}
