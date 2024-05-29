import { toFormattedTimeStampToDate } from "@/utils/functions/formmatter_date";

export class PresenceModel {
  id: string;
  id_meeting: string;
  id_user: string;
  date: Date;

  constructor(id: string, id_meeting: string, id_user: string, date: Date) {
    this.id = id;
    this.id_meeting = id_meeting;
    this.id_user = id_user;
    this.date = date;
  }

  static fromJSON(json: any): PresenceModel {
    const date = toFormattedTimeStampToDate(json.date);

    return new PresenceModel(json.id, json.id_meeting, json.id_user, date);
  }
}
