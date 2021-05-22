import { Dateable } from '../types'
import { hour } from '@yehonadav/timeunit'

export const date = new Date();

export const local_offset = date.getTimezoneOffset() / -60;
export const offset = 0;
export const offset_delta = offset - local_offset;

export function addDays(date:Date, days:number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addHours(date:Date, hours:number) {
  const result = new Date(date);
  result.setTime(date.getTime() + hours * hour);
  return result;
}

export function timeConversion(millisec:number) {
  const raw_hours = millisec / hour;
  const hours = Math.floor(raw_hours);

  const raw_minutes = (raw_hours - hours) * 60;
  const minutes = Math.floor(raw_minutes);

  const raw_seconds = (raw_minutes - minutes) * 60;
  const seconds = Math.floor(raw_seconds);

  return {
    hours,
    minutes,
    seconds,
  };
}

export function getDay(date: Date) {
  const result = new Date(date);
  result.setHours(0);
  result.setMinutes(0);
  result.setSeconds(0);
  result.setMilliseconds(0);
  return result;
}

export function timeRemain(date: Date) {
  const next = getDay(addDays(date, 1));

  // @ts-ignore
  const millisecionds_delta:number = next - date;
  const time_remains = timeConversion(millisecionds_delta);

  return {
    hours: time_remains.hours,
    minutes: time_remains.minutes,
    seconds: time_remains.seconds,
  }
}

export function timeRemainOffset() {
  return timeRemain(addHours(new Date(), offset_delta));
}

export function getToday() {
  return getDay(addHours(new Date(), offset_delta));
}

export function getYesterday() {
  return addDays(getToday(), -1);
}

export function disablePrevDates(startDate:Date|string) {
  // @ts-ignore
  const startSeconds = Date.parse(startDate);
  return (date: Date|string) => {
    // @ts-ignore
    return Date.parse(date) > startSeconds;
  }
}

export function disableFutureDates(startDate:Date|string) {
  // @ts-ignore
  const startSeconds = Date.parse(startDate);
  return (date: Date|string) => {
    // @ts-ignore
    return Date.parse(date) > startSeconds;
  }
}

export const addZero = (i:number):string => i < 10 ? `0${i}` : i.toString();

export const getHoursAndMinutesFormat = (d:Date|string):string => typeof d === 'string'
  ? d
  : `${addZero(d.getHours())}:${addZero(d.getMinutes())}`;

export function getDateFromHoursAndMinutesFormat(hoursAndMinutesFormat: string|Date|undefined|null):Date|undefined|null {
  // hoursAndMinutesFormat is expecting a string like this: "hh:mm"
  if (typeof hoursAndMinutesFormat !== 'string')
    return hoursAndMinutesFormat;

  if (hoursAndMinutesFormat.length !== 5)
    throw Error(`hoursAndMinutesFormatError: assertion hoursAndMinutesFormat.length !== 5 failed, hoursAndMinutesFormat.length=${hoursAndMinutesFormat.length}`)

  const date = new Date();
  const hours = Number(hoursAndMinutesFormat[0] + hoursAndMinutesFormat[1])
  const minutes = Number(hoursAndMinutesFormat[3] + hoursAndMinutesFormat[4])

  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
}

export type DatePrettyWrappedFunction = (value:Dateable) => string;
export type DatePrettyFunction = (value:Date) => string;

export const datePrettyWrapper = (call:DatePrettyFunction):DatePrettyWrappedFunction => {
  return (value:Dateable):string => {
    if (!value)
      return "--";

    const date = new Date(value);

    return call(date);
  }
}

export const datetimePretty:DatePrettyWrappedFunction = datePrettyWrapper((date:Date):string => {
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
});

export const datePretty:DatePrettyWrappedFunction = datePrettyWrapper((date:Date):string => {
  return date.toLocaleDateString();
});