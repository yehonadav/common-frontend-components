import React, { FC, ReactNode, useEffect } from 'react'
import ReactGA from 'react-ga'

let initialized = false;

// //https://www.analyticsmania.com/post/downgrade-from-google-analytics-4-to-universal-analytics/
export const GoogleAnalyticsProvider:FC<{
  children:ReactNode,
  googleAnalyticsTrackingId:string,
}> = (
  {
    children,
    googleAnalyticsTrackingId,
  }) =>
{
  useEffect(() => {
    if (!initialized) {
      ReactGA.initialize(googleAnalyticsTrackingId);
      initialized = true;
    }
  }, []);

  return <>{children}</>
};