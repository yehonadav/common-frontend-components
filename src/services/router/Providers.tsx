import React, { FC, ReactNode } from 'react'
import { history } from '../../utils';
import { Router } from "react-router-dom";
import { History } from 'history';

interface IBrowserRouterProvider {
  history?: History;
  children: ReactNode;
}

const BrowserRouterProvider:
  FC<IBrowserRouterProvider> =
  ({children }) =>
{
  return (
    <Router history={history}>
      {children}
    </Router>
  )
}

export {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
  Switch,
  Route,
  Link,
  Redirect,
  RouteComponentProps,
  matchPath,
  match,

  BrowserRouterProvider,
  IBrowserRouterProvider,
}