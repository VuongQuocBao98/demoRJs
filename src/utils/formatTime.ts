import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fTimestampSecond(date: InputValue) {
  if (!date) {
    return '';
  }
  const timestamp = getTime(new Date(date));
  const timestampStr = timestamp.toString();

  return timestampStr.substring(0, timestampStr.length - 3);
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export const combineDateWithTime = (dateStr: string, timeStr: string) => {
  const date = new Date(dateStr);
  const time = new Date(timeStr);
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
    time.getMilliseconds()
  );
};
