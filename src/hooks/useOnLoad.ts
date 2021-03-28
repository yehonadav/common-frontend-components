import {useEffect} from "react";

export const useOnLoad = (fn:()=>any) => {
  useEffect(()=>{
    fn()
  },[]);
};