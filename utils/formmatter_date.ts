import { Timestamp } from "firebase/firestore";

export function toFormattedTimeStampToDate(dateTimeStamp: Timestamp): Date {
  const date = dateTimeStamp.toDate();
  date.setHours(0, 0, 0, 0);
  return date;
}
