import React from "react";
import Meetings from "./meetings/meetings";
import Header from "./header/header";
import Image from "next/image";
import DataUser from "./dataUser/dataUser";

function Home() {


  return (
    <div className="flex flex-col  w-full px-[10%]">
      <Header />

      <Image
        className="w-full aspect-[40/9] bg-primary mt-[15px] rounded-[15px] items-center p-[5px]"
        src="/images/jesus.webp"
        alt="Banner"
        width={2285.99}
        height={791}
        priority
      />
      <div className="flex gap-x-[50px] pb-[15px]">
        <DataUser />
        <Meetings />
      </div>
    </div>
  );
}

export default Home;
