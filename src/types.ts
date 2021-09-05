import React, { ChangeEvent, FC, ReactNode } from 'react'
import { StandardTextFieldProps } from '@material-ui/core'
import { DateTimePickerProps } from '@material-ui/pickers/DateTimePicker/DateTimePicker'
import { TimePickerProps } from '@material-ui/pickers/TimePicker/TimePicker'

export type BaseFunctionType = () => void;
export type ReturnAnyFunction = () => any;
export type Function = (...args: Array<any>) => any;
export type FunctionEvent = (event: ChangeEvent<HTMLInputElement>) => any;
export type AsyncArglessFunction = () => Promise<any>;
export type AsyncFunction = (...args: Array<any>) => Promise<any>;
export type _SetStateWithArgs = (...args: Array<any>) => void;
export type _StateFunc = (prevState: any) => any;
export type _SetStateWithFunc = (setState: _StateFunc) => void;
export type SetState = _SetStateWithArgs | _SetStateWithFunc;
export type ImageReady = (url: string, blob:Blob) => any;
export type OnFileChange = (props:FileChangeProps) => any;
export type ValidateFile = (file:File) => boolean;

export type FileChangeProps = {
  file: File | null,
  name: string,
  extension: string | null,
  url: any,
  handleRemove?: Function,
  handleClear?:Function,
}

export type Direction = 'left' | 'right' | 'up' | 'down';

export type Snackbar = {
  anchorOrigin: {
    vertical: 'top' | 'bottom',
    horizontal: 'left' | 'center' | 'right',
  },
  autoHideDuration: number,
  open: boolean,
  message: string,
  variant: 'error' | 'info' | 'success' | 'warning' | 'default' | 'primary',
}

export type ID = string;

export type Error = any;

export type NullableBoolean = null | boolean;
export type NullableString = null | string;
export type NullableDate = null | Date;
export type OptionalBoolean = undefined | boolean;
export type OptionalString = undefined | string;
export type Dateable = Date | string | null | undefined | false;

export type setValueType = (name: string, value: any, config?: any) => void;

export interface IcontentProps {
  activeStep: number;
  handleNext: () => void;
  [x: string]: any;
}

export type StepComponentType = (props:IcontentProps) => JSX.Element;

export type StyleType = {[x:string]:undefined|number|string};

export type ItiContainerType = {iti?:any};

export type DivType = FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare type Size = { width: number, height: number };

// @ts-ignore
export interface InputPropsType extends StandardTextFieldProps {
  error?: Error,
  icon?: ReactNode,
  endIcon?: ReactNode,
  variant?: "standard" | "filled" | "outlined" | undefined,
}

export type onDateChangeType = (date:NullableDate) => NullableDate;

export type TimeInputType = TimePickerProps & {
  InputProps?: InputPropsType;
  onChange?: any;
  value?: any;
  initialvalue?: Date|string;
  onDateChange?: onDateChangeType;
};

export type DateTimeInputType = DateTimePickerProps & {
  InputProps?: InputPropsType;
  onChange?: any;
  value?: any;
  initialvalue?: Date;
  onDateChange?: onDateChangeType;
};

export type PersistOptions<S> = {
  name: string,
  whitelist: Array<keyof S>,
  getStorage: () => Storage,
};

export type LinkOptions = Record<string, string>;

export type Links<Routes> = {
  [Property in keyof Routes]: (replace?: LinkOptions|any) => void;
}

export interface PageTransitionsOptions {
  delay?: number;
  replace?: LinkOptions;
}

export type PageTransitions<Links> = {
  [Property in keyof Links]: (options?: PageTransitionsOptions|any) => void;
}