import Link from "next/link";
import React from "react";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { HiBars3 } from "react-icons/hi2";
import HeaderTool from "./HeaderTool";

const HeaderTop = () => {
  return (
    <div className="flex items-center justify-between max-w-[1200px] mx-auto px-2">
      <div className="hidden md:block flex-1"></div>
      <div className="flex-1 flex justify-start md:justify-center">
        <Link href={"/"}>
          <h1 className="text-neutral font-bold text-2xl md:text-4xl">MISSOUT</h1>
        </Link>
      </div>
      <HeaderTool />
    </div>
  );
};

export default HeaderTop;
