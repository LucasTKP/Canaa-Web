import { Timestamp } from "firebase/firestore";

export function toFormattedTimeStampToDate(dateTimeStamp: Timestamp): Date {
  const date = dateTimeStamp.toDate();
  date.setHours(0, 0, 0, 0);
  return date;
}

export function toFormattedDateToString(date: Date): string {
  const months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} de ${month} de ${year}`;
}
