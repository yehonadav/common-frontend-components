import React, {useCallback, useState} from "react";

export type TargetValueType = undefined|null|string;
export type TargetCheckedType = undefined|null|boolean;

export type EventTargetValueType = [TargetValueType, (state:TargetValueType) => void, (event:React.ChangeEvent<HTMLInputElement>) => void];
export type EventTargetCheckedType = [TargetCheckedType, (state:TargetCheckedType) => void, (event:React.ChangeEvent<HTMLInputElement>) => void];

export const useEventTargetValue = (value:TargetValueType):EventTargetValueType => {
  const state = useState(value);
  const handleEvent: (event:React.ChangeEvent<HTMLInputElement>) => void = useCallback(event=>{state[1](event.target.value)},[state[1]]);
  return [...state, handleEvent]
};

export const useEventTargetChecked = (value:TargetCheckedType):EventTargetCheckedType => {
  const state = useState(value);
  const handleEvent: (event:React.ChangeEvent<HTMLInputElement>) => void = useCallback(event=>{state[1](event.target.checked)},[state[1]]);
  return [...state, handleEvent]
};