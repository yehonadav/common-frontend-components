import React from "react";
import {FC, ReactNode} from "react";
import { useAttemptSilentRefresh, useIsLogged } from '../../services'

export const SilentLoginProvider:FC<{children:ReactNode, loading?:ReactNode}> = ({children, loading=null}) => {
  useAttemptSilentRefresh();
  const isLogged = useIsLogged();
  return <>{isLogged === null ? loading : children}</>
}