import { auth } from "@/lib/firebase_config";
import {
  createUserWithEmailAndPassword,
  UserCredential,
  User,
  signInWithEmailAndPassword,
  browserSessionPersistence,
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

export async function signInUser({
  email,
  password,
}: Record<string, string>): Promise<User> {
  auth.setPersistence(browserSessionPersistence);
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
}
