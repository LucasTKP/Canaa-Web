import { toFormattedTimeStampToDate } from "@/utils/functions/formmatter_date";

export class UserModel {
  id: string;
  name: string;
  email: string;
  madeCane: boolean;
  madeCaneYear?: number;
  lastPresence: Date;
  totalPresence: number;
  photo: string;
  isAdmin?: boolean;

  constructor(
    id: string,
    name: string,
    email: string,
    madeCane: boolean,
    madeCaneYear: number | undefined,
    lastPresence: Date,
    totalPresence: number,
    photo: string,
    isAdmin: boolean
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.madeCane = madeCane;
    this.madeCaneYear = madeCaneYear;
    this.lastPresence = lastPresence;
    this.totalPresence = totalPresence;
    this.photo = photo;
    this.isAdmin = isAdmin;
  }

  static fromJSON(json: any): UserModel {
    const lastPresence = toFormattedTimeStampToDate(json.lastPresence);

    return new UserModel(
      json.id,
      json.name,
      json.email,
      json.madeCane,
      json.madeCaneYear,
      lastPresence,
      json.totalPresence,
      json.photo,
      json.isAdmin ? true : false
    );
  }
}

export interface IDataAuthUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  madeCane: boolean;
  madeCaneYear?: number;
  photo: string
}
