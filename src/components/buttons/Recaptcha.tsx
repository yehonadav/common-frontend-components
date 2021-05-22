import ReCAPTCHA from "react-google-recaptcha";
import React from "react";
import { appConfig } from '../../variables'
import { alertService, baseColors } from '../../services'

export interface IRecaptcha {
  setValue: (...args: any) => void;
  error?: React.ReactNode;
  recaptchaRef: any;
}

export const Recaptcha = ({setValue, error=null, recaptchaRef}:IRecaptcha) => {
  return (
    <>
      <input type="text" id="recaptcha" name="recaptcha" style={{display: "none"}}/>
      <ReCAPTCHA
        // @ts-ignore
        ref={recaptchaRef}
        sitekey={appConfig.reCaptchaSiteKey||""}
        onChange={(response: any) => {
          const el = document.getElementById("recaptcha");
          if (!el)
            alertService.error("failed to set re-captcha response");
          else {
            // @ts-ignore
            el.setAttribute("value", response);
          }
          setValue("recaptcha", response)
        }}
      />
      <p style={{textAlign: "left", marginTop: 8, color: baseColors.red, display:'block'}}>
        {error}
      </p>
    </>
  )
};