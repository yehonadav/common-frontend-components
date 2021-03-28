import {
  Dispatch,
  SetStateAction, useEffect,
  useState,
} from "react";

export interface IusePropsAsState {
  <S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]
}

export const usePropsAsState:IusePropsAsState = (props) => {
  const state = useState(props);
  useEffect(()=>{state[1](props)}, [props]);
  return state;
}
