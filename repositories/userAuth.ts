import { auth } from "@/lib/firebase_config";
import {
  createUserWithEmailAndPassword,
  UserCredential,
  User,
  signInWithEmailAndPassword,
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

export function getAuthUser(): User | null {
  const user = auth.currentUser;

  if (user) {
    return user;
  }
  return null;
}

export async  function signInUser({ email, password }: Record<string, string>): Promise<User>{
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user;
}
