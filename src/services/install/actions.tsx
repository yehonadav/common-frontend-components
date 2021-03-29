import React from 'react';
import {appConfig} from '../../variables'
import {baseSuccessPopup} from '../../popups';
import {baseErrorPopup} from '../../popups';
import {setInstallStore} from './useStore'

export const onInstallServiceOpenDialog = ():void => setInstallStore(()=>({open:true}));

export const onInstallServiceClose = ():void => setInstallStore(()=>({open:false, clicked: true}));

export const onInstallServiceInstall = (pwaInstall: (options: {
    title?: string;
    logo?: string;
    features?: React.ReactNode;
    description?: string;
  }) => Promise<void>
):void => {
  pwaInstall({
    title: `Install ${appConfig.app_name}`,
    logo: appConfig.logo,
    description: appConfig.app_description,
  })
    .then(() => {
      baseSuccessPopup({text: `${appConfig.app_name} App is now installed`});
      onInstallServiceClose();
    })

    .catch(() => baseErrorPopup({text: `You opted out from installing ${appConfig.app_name} App`}));
};