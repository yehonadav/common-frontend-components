import { useState } from "react";
import { useInterval } from "./useInterval";

export const useLoadDot = (loading:boolean|null|undefined) => {
  const [load_msg, set_load_msg] = useState('    ');
  useInterval(() => {load_msg !== '....' ? set_load_msg(load_msg.replace(" ", ".")) : set_load_msg('    ')}, loading ? 450 : false);
  return load_msg
};