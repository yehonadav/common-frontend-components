import React, { FC, useEffect } from 'react'
import ReactGA, { FieldsObject, TrackerNames } from 'react-ga'
import { useLocation } from 'react-router-dom'

export const TrackRouteWithGAU4 = (WrappedComponent:FC, fieldsObject: FieldsObject={}, trackerNames?: TrackerNames):FC<any> => props => {
  const page = useLocation().pathname;

  useEffect(() => {
    ReactGA.set({ page, ...fieldsObject }, trackerNames);
    ReactGA.pageview(page);
  }, [page]);

  return <WrappedComponent {...props} />;
}