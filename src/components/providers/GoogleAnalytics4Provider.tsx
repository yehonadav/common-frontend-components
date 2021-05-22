import React, { FC, ReactNode } from 'react'
import GA4React from "ga-4-react";
import { GA4Config, GA4ManagerOptionsInterface } from 'ga-4-react/dist/models/gtagModels'
import { useOnLoad } from '../../hooks'
import { GA4ReactResolveInterface } from 'ga-4-react/src/models/gtagModels'
import { useLocation } from 'react-router-dom'

let ga4react:GA4React|undefined;
let ga4:GA4ReactResolveInterface|undefined;

// https://stackoverflow.com/questions/64623059/google-analytics-4-with-react/64623872
export const GoogleAnalytics4Provider:FC<{
  children:ReactNode,
  gaCode: string;
  gaConfig?: GA4Config;
  additionalGaCode?: string[];
  timeout?: number;
  options?: GA4ManagerOptionsInterface;
}> = (
  {
    children,
    gaCode,
    gaConfig,
    additionalGaCode,
    timeout,
    options,
  }) =>
{
  useOnLoad(() => {
    if (!ga4react) {
      ga4react = new GA4React(
        gaCode,
        gaConfig,
        additionalGaCode,
        timeout,
        options,
      );
      ga4react.initialize()
        .then((i) => {
          const page = useLocation().pathname;
          ga4 = i;
          ga4.pageview(page);
          ga4.gtag('event','pageview', page); // or your custom gtag event
        }, (err) => {
          console.error({ ga4reactError: err })
        });
    }
  });

  return <>{children}</>
};