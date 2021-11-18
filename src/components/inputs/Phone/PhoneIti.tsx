import React, {useEffect, useState, useLayoutEffect, ReactElement} from "react";
import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';
import CircularProgress from '@material-ui/core/CircularProgress'
import { setIpinfoCountry, useIpinfoCountry, useIpinfoLoading } from '../../../stores'
import { ItiContainerType } from '../../../types'

export const phoneErrorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
export const phoneUtilsScript = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.min.js';

export const usePhone = ({id, value}:{id:string, value:string|undefined}) => {
  const [ready, setReady] = useState(false);

  const country = useIpinfoCountry();
  const loadingCountry = useIpinfoLoading();

  const [iti, setIti] = useState<any | undefined>();

  useLayoutEffect(() => {
    if (loadingCountry === false && !iti) {

      const el = document.getElementById(id);

      if (el===null)
        throw `missing element with id="${id}"`;

      const iti = intlTelInput(el, {initialCountry: country.toLowerCase(), utilsScript: phoneUtilsScript});

      el.addEventListener("countrychange", function(_e: any) {setIpinfoCountry(iti.getSelectedCountryData().iso2)});

      setIti(iti);
      setReady(true);
    }

    return () => {
      iti && iti.destroy();
    }
  }, [loadingCountry]);

  useEffect(()=>{ready && value!==undefined && iti.setNumber(value)}, [ready, value]);

  return iti;
};

export const PhoneIti = (
  {
    id="phone",
    children,
    container={},
    initialValue,
    useIpInfo=true,
  }:{
    id?: string,
    children: any, // need <input id={id} value={inputValue} onChange={onInputChange} {...props}/>
    container: ItiContainerType, // container needs to come from outside of Formik ! (maybe we can make it internal if we get rid of formik)
    initialValue: string|undefined, // full phone number !
    useIpInfo: boolean, // use ipinfo to get country
  }):ReactElement =>
{
  const loadingCountry = useIpinfoLoading();

  container.iti = usePhone({id, value: initialValue});

  if (loadingCountry !== false && useIpInfo)
    return <CircularProgress/>;

  return children;
};