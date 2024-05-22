"use client";
import { useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase_config";
import { useRouter } from "next/navigation";
import { getUser } from "@/repositories/userFireStore";
import { formatterError } from "@/utils/formatter_error";
import { UserModel } from "@/models/user";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<UserModel>();
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (userAuth) => {
      const pathname = window.location.pathname;
      if (userAuth == null) {
        if (pathname != "/") {
          return router.push("/");
        }
      }
      if (userAuth) {
        try {
          const dataUser = await getUser(userAuth.uid);
          if (dataUser) {
            setUser(dataUser);
            if (pathname != "/") return;
            return router.push("/home");
          }
        } catch (error) {
          formatterError(error);
        }
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
