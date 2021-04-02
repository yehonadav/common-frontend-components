import React, { FC, ReactNode } from 'react'
import { history } from '../../utils';
import { Router } from "react-router-dom";
import { History } from 'history';

export * from "react-router-dom";

export interface IBrowserRouterProvider {
  history?: History;
  children: ReactNode;
}

export const BrowserRouterProvider:
  FC<IBrowserRouterProvider> =
  ({children }) =>
{
  return (
    <Router history={history}>
      {children}
    </Router>
  )
}
