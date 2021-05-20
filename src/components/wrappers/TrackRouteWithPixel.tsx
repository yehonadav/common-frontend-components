import React, { FC, useEffect } from 'react'
import ReactPixel from 'react-facebook-pixel'
import { useLocation } from 'react-router-dom'

export const TrackRouteWithPixel = (WrappedComponent:FC):FC<any> => props => {
  const page = useLocation().pathname;
  useEffect(ReactPixel.pageView, [page]);
  return <WrappedComponent {...props} />;
}