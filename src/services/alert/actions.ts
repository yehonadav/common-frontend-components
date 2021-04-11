import {alertTypes} from "./variables";
import Swal, {SweetAlertOptions, SweetAlertPosition} from "sweetalert2";
import { getMobile } from '../../stores';
import { safeStringify } from '../../utils/safeStringify'

export interface IAlertOptionals {
  timeout?: number;
  position?: SweetAlertPosition;
  showConfirmButton?: boolean;
  fireProps?: SweetAlertOptions;
  mixinProps?: SweetAlertOptions;
}

export interface IAlert extends IAlertOptionals {
  type: string;
  title: any;
}

const createAlert = (props:IAlert) => {
  const {type, title, timeout} = props;
  const timerProgressBar = timeout ? !!timeout : undefined;
  const mixinProps = props.mixinProps ?? {};
  const fireProps = props.fireProps ?? {};

  // @ts-ignore
  return Swal.mixin({
    toast: !getMobile(),
    position: props.position ?? 'top',
    showConfirmButton: props.showConfirmButton,
    timerProgressBar,
    timer: timeout,
    didOpen: (toast: { addEventListener: (arg0: string, arg1: { (): number | undefined; (): number | undefined; }) => void; }) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    ...mixinProps
  }).fire({
    timerProgressBar,
    type,
    icon: type,
    title: typeof title === "string" ? title : safeStringify(title),
    ...fireProps
  });
};

export type TalertCall = (msg:any, options?:IAlertOptionals) => void;

const error:TalertCall = (msg, options={}) => {
  console.error('alert error:', msg);
  createAlert({
    type: alertTypes.error,
    title: msg,
    showConfirmButton: true,
    ...options,
  });
};

const success:TalertCall = (msg, options={}) => {
  createAlert({
    type: alertTypes.success,
    title: msg,
    showConfirmButton: true,
    ...options,
  });
};

const warning:TalertCall = (msg, options={}) => {
  createAlert({
    type: alertTypes.warning,
    title: msg,
    showConfirmButton: true,
    ...options,
  });
};

const info:TalertCall = (msg, options={}) => {
  createAlert({
    type: alertTypes.info,
    title: msg,
    showConfirmButton: true,
    ...options,
  });
};

const signOutAlert:TalertCall = (msg='Signed Out', options={}) => {
  createAlert({
    type: "warning",
    title: msg,
    timeout: 3000,
    mixinProps: {
      position: 'top-end',
      showConfirmButton: false,
      toast: true,
    },
    ...options,
  });
};

export {
  createAlert,
  error,
  success,
  warning,
  info,
  signOutAlert,
}