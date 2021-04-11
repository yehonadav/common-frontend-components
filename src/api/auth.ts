import { accountService, alertService, stopRefreshTokenTimer } from '../services'

export type ApiCallType =
  < Params extends Array<any> = Array<any>, Response=any >
  ( ...props:Params )
    => Promise<Response>;

export const authCall = (call:ApiCallType):ApiCallType => async (...args) => {
  try
  {
    return await call(...args)
  }
  catch (e)
  {
    // if token is unauthorized
    if (e.response?.status === 401) {

      // try to refresh
      try {
        stopRefreshTokenTimer();
        await accountService.refreshToken();
      }

      // logout if refresh fails
      catch (e2) {
        console.error("tried to refresh but failed", e2);

        accountService.logout();
        alertService.error("token expired, please login again");

        throw e;
      }

      // retry
      try {
        return await call(...args);
      }
      catch (e3) {
        // if token is unauthorized after refresh
        if (e.response?.status === 401)
          accountService.logout();

        throw e3
      }
    }
    throw e;
  }
}
