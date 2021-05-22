// this is probably deprecated

export const createUserMedia = ():
  (constraints: MediaStreamConstraints) => Promise<MediaStream> =>
{
  const e = "getUserMedia Is Not Implemented on this device";
  const getUserMediaIsNotImplemented = () => Promise.reject(new Error(e));

  if (!("mediaDevices" in navigator))
    return getUserMediaIsNotImplemented;

  if ("getUserMedia" in navigator.mediaDevices)
    return navigator.mediaDevices.getUserMedia;

  else {
    const getUserMediaAlternative = // @ts-ignore
      navigator.getUserMedia || navigator.webkitGetUserMedia || // @ts-ignore
      navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if (!getUserMediaAlternative)
      return getUserMediaIsNotImplemented;

    else
      return (constraints: MediaStreamConstraints) =>
        new Promise((resolve, reject) => {
          getUserMediaAlternative.call(navigator, constraints, resolve, reject);
        });
  }
}

export const getUserMedia = createUserMedia();
