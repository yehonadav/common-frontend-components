import {FC, ReactNode, StrictMode} from 'react';

import {Switch, Redirect, useLocation, Route} from "react-router-dom";
import {routes} from "../variables/routes";
import { Backdrop, BrowserRouterProvider } from '../services'
import { useLoadIpinfo, useScrollTransition, useSizeListener, useSizes } from '../stores'
import React from 'react';

const Providers:FC<{children:ReactNode}> = ({children}) => {
  return (
    <StrictMode>
      {/*<ThemeProvider>*/}
        <BrowserRouterProvider>
          {children}
        </BrowserRouterProvider>
      {/*</ThemeProvider>*/}
    </StrictMode>
  )
}

const Hooks:FC<{children:ReactNode}> = ({children}) => {
  useSizeListener();
  useScrollTransition();
  useSizes();
  useLoadIpinfo();

  return <>{children}</>;
}

const Routes:FC = () => {
  const { pathname } = useLocation();
  return (
    <Switch>
      <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
      <Route path={routes.home} exact component={()=><div>home</div>}/>
      <Route path={routes.about} exact component={()=><div>about</div>}/>
      <Route path={routes.privacy} exact component={()=><div>privacy</div>}/>
      <Route path={routes.terms} exact component={()=><div>terms</div>}/>
      <Route path={routes.contact} exact component={()=><div>contact</div>}/>
      <Redirect from="*" to={routes.home} />
    </Switch>
  )
}

const Poppers:FC = () => {
  return (
    <>
      <Backdrop/>
    </>
  )
}

const App:FC = () => {
  return (
    <>
      <Routes/>
      <Poppers/>
    </>
  )
}

export const DevApp:FC = () => {
  return (
    <Providers>
      <Hooks>
        <App/>
      </Hooks>
    </Providers>
  );
}