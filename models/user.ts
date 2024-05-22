interface UserModel {
  id: string;
  name: string;
  email: string;
  madeCane: boolean;
  madeCaneDate?: number;
  lastPresence: Date;
  totalPresence: number;
  photo: string;
}

interface IDataAuthUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  madeCane: boolean;
  madeCaneDate?: number;
}
