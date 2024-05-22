import { Timestamp } from "firebase/firestore";

export class UserModel {
  id: string;
  name: string;
  email: string;
  madeCane: boolean;
  madeCaneDate?: number;
  lastPresence: string;
  totalPresence: number;
  photo: string;
  isAdmin?: boolean;

  constructor(
    id: string,
    name: string,
    email: string,
    madeCane: boolean,
    madeCaneDate: number | undefined,
    lastPresence: string,
    totalPresence: number,
    photo: string,
    isAdmin: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.madeCane = madeCane;
    this.madeCaneDate = madeCaneDate;
    this.lastPresence = lastPresence;
    this.totalPresence = totalPresence;
    this.photo = photo;
    this.isAdmin = isAdmin;
  }

  static fromJSON(json: any): UserModel {
    return new UserModel(
      json.id,
      json.name,
      json.email,
      json.madeCane,
      json.madeCaneDate,
      json.lastPresence,
      json.totalPresence,
      json.photo,
      json.isAdmin ? true : false,
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
  madeCaneDate?: number;
}
