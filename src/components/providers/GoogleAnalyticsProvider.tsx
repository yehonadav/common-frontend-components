import React, { FC, ReactNode, useEffect } from 'react'
import ReactGA from 'react-ga'

let initialized = false;

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