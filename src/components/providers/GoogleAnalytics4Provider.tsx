import React, { FC, ReactNode } from 'react'
import GA4React from "ga-4-react";
import { GA4Config, GA4ManagerOptionsInterface } from 'ga-4-react/dist/models/gtagModels'
import { useOnLoad } from '../../hooks'
import { useLocation } from 'react-router-dom'
import { getIsGA4Initialized, setGA4, setGa4React, setIsGA4Initialized } from '../../stores/useGA4Store'

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
    const isInitialized = getIsGA4Initialized();
    if (!isInitialized) {
      const ga4react = new GA4React(
        gaCode,
        gaConfig,
        additionalGaCode,
        timeout,
        options,
      );
      setGa4React(ga4react);

      ga4react.initialize()
        .then((ga4) => {
          const page = useLocation().pathname;
          ga4.pageview(page);
          ga4.gtag('event','pageview', page); // or your custom gtag event

          setGA4(ga4);
          setIsGA4Initialized(true);
        }, (err) => {
          console.error({ ga4reactError: err })
        });
    }
  });

  return <>{children}</>
};