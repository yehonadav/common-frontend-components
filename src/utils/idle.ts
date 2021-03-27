// https://stackoverflow.com/questions/667555/how-to-detect-idle-time-in-javascript-elegantly

export const windowEvents = ['load'];
export const documentEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

export const createEventsDefault = (callback:()=>void) => {
  windowEvents.forEach(function(name) {window.addEventListener(name, callback, true)});
  documentEvents.forEach(function(name) {document.addEventListener(name, callback, true)});
};

export const removeEventsDefault = (callback:()=>void) => {
  windowEvents.forEach(function(name) {window.removeEventListener(name, callback, true)});
  documentEvents.forEach(function(name) {document.removeEventListener(name, callback, true)});
};

export function idle(
  {
    onIdle,
    timeout,
    onActive=()=>{},
    createEvents=createEventsDefault,
    removeEvents=removeEventsDefault,
  }:{
    onIdle:()=>void,
    timeout:number,
    onActive?:()=>void,
    createEvents?:(callback:()=>void)=>void,
    removeEvents?:(callback:()=>void)=>void,
  })
{
  let onTimeout: any;

  function resetTimer() {
    clearTimeout(onTimeout);
    onTimeout = setTimeout(onIdle, timeout);  // time is in milliseconds
    onActive();
  }

  createEvents(resetTimer);

  return {
    onTimeout,
    resetTimer,
    createEvents,
    removeEvents,
  }
}
