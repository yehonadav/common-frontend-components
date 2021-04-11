import {User, NullableUser} from "./types";
import { fetchUserStore, useUserStore, setIdle, setUserStore } from './useStore'
import {idle} from '../../utils';
import {useOnLoad} from '../../hooks';
import {_logout} from "./helpers";
import {useEffect} from "react";
import {accountService} from "./service";
import {defaultUserDetails} from "./variables";
import { NullableBoolean } from '../../types'

const useUser = (): NullableUser => useUserStore(fetchUserStore.user);
const useIdle = (): NullableBoolean => useUserStore(fetchUserStore.idle);
const useSignin = (): boolean => useUserStore(fetchUserStore.signin);
const useIsLogged = (): NullableBoolean => useUserStore(fetchUserStore.isLogged);
const useDidLogin = (): boolean => useUserStore(fetchUserStore.didLogin);
const useLoggedOut = (): boolean => useUserStore(fetchUserStore.loggedOut);
const useUserLoading = (): NullableBoolean => useUserStore(fetchUserStore.loading);
const useUserDetails = ():User => {return useUser() || defaultUserDetails}

// global hook
const useLogoutIdle = (timeout:number):void => {
  useOnLoad(() => {
    setIdle(false);
    idle({
      onIdle: () => {
        setIdle(true);
        _logout()
      },
      onActive: () => {setIdle(false)},
      timeout,
    })
  })
};

// global hook
const useAttemptSilentRefresh = ():void => {
  const isLogged = useIsLogged();
  const loading = useUserLoading();

  // attempt silent token refresh before startup
  useEffect(()=>{
    if (isLogged===null && !loading)
      accountService.refreshToken()
        .then(()=>setUserStore({isLogged : true}))
        .catch(()=>setUserStore({isLogged : false}));
  }, [isLogged, loading]);
};

export {
  useUser,
  useIdle,
  useSignin,
  useIsLogged,
  useDidLogin,
  useLoggedOut,
  useUserLoading,
  useUserDetails,
  useLogoutIdle,
  useAttemptSilentRefresh,
}