import { auth } from "@/lib/firebase_config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";

interface iCreateAuthUser {
  email: string;
  password: string;
}

export async function createAuthUser({
  email,
  password,
}: iCreateAuthUser): Promise<UserCredential> {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result;
}
