"use client";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase_config";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        if (pathname != "/") return;
        return router.push("/home");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return children ;
}
