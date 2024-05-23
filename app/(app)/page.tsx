"use client";
import Auth from "@/components/auth/auth";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col">
      <Auth />
      <footer className="h-[60px] w-full mt-auto bottom-0 bg-secondary/30 flex justify-center items-center">
        {`Direitos reservados - Canaã ${new Date().getFullYear()}`}
      </footer>
    </main>
  );
}
