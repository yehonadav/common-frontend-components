import React, { FC, ReactNode } from 'react'
import ReactGA from 'react-ga'
import { useOnLoad } from '../../hooks'

let initialized = false;

// https://www.analyticsmania.com/post/downgrade-from-google-analytics-4-to-universal-analytics/
export const GoogleAnalyticsU4Provider:FC<{
  children:ReactNode,
  googleAnalyticsTrackingId:string,
}> = (
  {
    children,
    googleAnalyticsTrackingId,
  }) =>
{
  useOnLoad(() => {
    if (!initialized) {
      ReactGA.initialize(googleAnalyticsTrackingId);
      initialized = true;
    }
  });

  return <>{children}</>
};