import React from "react";
import {useInstallServiceStyles} from "../styles";
import { appConfig } from '../../../variables'

export const InstallLogo = () => <img src={appConfig.logo} className={useInstallServiceStyles().logo} alt={appConfig.app_name}/>;
export const InstallSmallLogo = () => <img src={appConfig.logo} className={useInstallServiceStyles().logoSmall} alt={appConfig.app_name}/>;
