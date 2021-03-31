import {useState, useEffect} from "react"
import {useLoadScript} from "@react-google-maps/api"
import {appConfig} from '../variables'
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url'

const libraries:Libraries = ["places"];


export default () => {
  const [ loaded_google_maps, set_loaded_google_maps ] = useState<null|boolean>(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: appConfig.google_maps_key || "",
    libraries,
  });

  useEffect(() => {
    if (loadError) {
      set_loaded_google_maps(false);
      console.error({
        useLoadGoogleMapsError: {
          'loaded_google_maps useLoadScript Error': {
            message: loadError,
          },
        },
      });
    }
    else if (isLoaded)
      set_loaded_google_maps(true);
  },[isLoaded, loadError]);

  return loaded_google_maps
}
