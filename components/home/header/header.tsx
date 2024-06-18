"use client";
import { UserContext } from "@/context/userContext";
import { auth } from "@/lib/firebase_config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  return (
    <div className="flex items-center text-[18px] relative">
      <Image
        src="/images/logo_canaã.png"
        alt="Logo"
        width={80}
        height={80}
        className="mx-auto"
      />
      <div className="flex gap-x-[20px] absolute right-0">
        <button
          onClick={() => signOut(auth)}
          className="bg-red px-[10px] py-[3px] rounded-[4px] font-[500] text-background hover:brightness-95 duration-200"
        >
          Sair
        </button>
        {user?.isAdmin && (
          <button
            onClick={() => router.push("/admin")}
            className="bg-primary px-[10px] py-[3px] rounded-[4px] font-[500] text-background hover:brightness-95 duration-200"
          >
            Painel de Administrador
          </button>
        )}
      </div>
    </div>
  );
}
