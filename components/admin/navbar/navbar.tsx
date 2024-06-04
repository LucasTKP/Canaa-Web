import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PersonIcon, ReaderIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";

function Navbar() {
  const path = usePathname();
  return (
    <div className="w-[120px]">
      <div className="w-[100px] h-screen fixed left-0 border-r-[2px] border-r-primary flex flex-col items-center">
        <Image
          alt="logo Canaã"
          src="/images/logo_canaã.png"
          width={80}
          height={80}
          className="object-cover mt-[20px]"
          priority
        />
        <Link
          href={"/admin"}
          className="w-full flex justify-center h-[35px] relative mt-[50px]"
        >
          {path === "/admin" && (
            <div className="w-[5px] h-[130%] absolute bg-primary rounded-full left-0 top-1/2 transform -translate-y-1/2" />
          )}
          <PersonIcon
            width={35}
            height={35}
            className={`h-full ${
              path === "/admin" ? "text-primary" : "text-gray-600"
            }`}
          />
        </Link>

        <Link
          href={"/admin/meetings"}
          className="w-full flex justify-center h-[35px] relative mt-[30px]"
        >
          {path === "/admin/meetings" && (
            <div className="w-[5px] h-[130%] absolute bg-primary rounded-full left-0 top-1/2 transform -translate-y-1/2" />
          )}
          <ReaderIcon
            width={35}
            height={35}
            className={`h-full ${
              path === "/admin/meetings" ? "text-primary" : "text-gray-600"
            }`}
          />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
