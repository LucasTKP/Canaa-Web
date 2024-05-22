"use client";
import Auth from "@/components/auth/auth";
import { auth } from "@/lib/firebase_config";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      console.log(user);
    }
  }, []);

  return (
    <main>
      <Auth />
    </main>
  );
}
