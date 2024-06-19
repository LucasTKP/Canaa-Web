import React from "react";
import Meetings from "./meetings/meetings";
import Header from "./header/header";
import Image from "next/image";
import DataUser from "./dataUser/dataUser";

function Home() {


  return (
    <div className="flex flex-col  w-full px-[10%] max-lg:px-[20px] max-sm:px-[10px]">
      <Header />

      <Image
        className="w-full aspect-[40/9] max-lg:aspect-[30/9] max-sm:aspect-[25/9] max-xsm:aspect-[20/9] bg-primary mt-[15px] rounded-[15px] items-center p-[5px]"
        src="/images/jesus.webp"
        alt="Banner"
        width={2285.99}
        height={791}
        priority
      />
      <div className="flex gap-x-[50px] pb-[15px] max-md:flex-wrap">
        <DataUser />
        <Meetings />
      </div>
    </div>
  );
}

export default Home;
