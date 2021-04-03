import { ReturnAnyFunction } from '../types'

export const tryOrNull = (call:ReturnAnyFunction) => {
  try {
    return call();
  }
  catch (e) {
    return null
  }
}