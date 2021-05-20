import React, { FC, ReactNode, useEffect } from 'react'
import ReactPixel from 'react-facebook-pixel';

let initialized = false;

export const FacebookPixelProvider:FC<{
  children:ReactNode,
  facebookPixelTrackingId:string,
}> = (
  {
    children,
    facebookPixelTrackingId,
  }) =>
{
  useEffect(() => {
    if (!initialized) {
      ReactPixel.init(facebookPixelTrackingId);
      initialized = true;
    }
  }, []);

  return <>{children}</>
};