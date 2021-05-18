import {v4} from "uuid";

export const getSrc = (src:string|undefined):string => {
  if (src === undefined)
    return "";

  if (src.startsWith("http"))
    return src + "?" + encodeURI(v4());

  return src;
}