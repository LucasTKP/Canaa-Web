"use client";
import { useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase_config";
import { getUser } from "@/repositories/userFireStore";
import { formatterError } from "@/utils/functions/formatter_error";
import { UserModel } from "@/models/user";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<UserModel | undefined>();

  useEffect(() => {
    onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        try {
          const dataUser = await getUser(userAuth.uid);
          if (dataUser) {
            setUser(dataUser);
          }
        } catch (error) {
          formatterError(error);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return user ? (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  ) : (
    <div className="w-screen h-screen bg-black/40 flex justify-center items-center">
      <div className="relative flex items-center justify-center w-[70px] h-[70px] rounded-full border-[10px] border-t-primary border-background animate-spin" />
    </div>
  );
}
