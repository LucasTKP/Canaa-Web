import { toFormattedTimeStampToDate } from "@/utils/functions/formmatter_date";

export class MeetingModel{
  id: string;
  theme: string;
  description: string;
  password: string;
  date: Date;
  isVisible: boolean;
  isOpen: boolean;


  constructor(
    id: string,
    theme: string,
    description: string,
    password: string,
    date: Date,
    isVisible: boolean,
    isOpen: boolean
  ) {
    this.id = id;
    this.theme = theme;
    this.description = description;
    this.password = password;
    this.date = date;
    this.isVisible = isVisible;
    this.isOpen = isOpen;
  }

  static fromJSON(json: any): MeetingModel {
    const date = toFormattedTimeStampToDate(json.date);

    return new MeetingModel(
      json.id,
      json.theme,
      json.description,
      json.password,
      date,
      json.isVisible,
      json.isOpen
    );
  }
}
