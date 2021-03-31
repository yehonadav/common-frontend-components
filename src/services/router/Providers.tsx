import React, { FC, ReactNode } from 'react'
import { history } from '../../utils';
import { Router } from "react-router-dom";
import { History } from 'history';

export interface IBrowserRouter {
  history?: History;
  children: ReactNode;
}

export const BrowserRouter:FC<IBrowserRouter> = ({ children }) => {
  return (
    <Router history={history}>
      {children}
    </Router>
  )
}
