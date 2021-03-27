export function isLocalStorageAvailable(){
  const test = 'isLocalStorageAvailable';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch(e) {
    return false;
  }
}

export function isSessionStorageAvailable(){
  const test = 'isSessionStorageAvailable';
  try {
    sessionStorage.setItem(test, test);
    sessionStorage.removeItem(test);
    return true;
  } catch(e) {
    return false;
  }
}