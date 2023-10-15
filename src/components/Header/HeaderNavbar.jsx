import Link from "next/link";
import React from "react";
import Navbar from "./Navbar";
import HeaderTool from "./HeaderTool";

const HeaderNavbar = ({ display = "none" }) => {
  return (
    <div
      className="border-b slip-top-to-bottom fixed top-0 left-0 right-0 z-50 bg-base-100 overflow-hidden"
      style={{ display }}
    >
      <div className="max-w-[1200px] flex items-center justify-between mx-auto px-2">
        <div className="flex-1">
          <Link href={"/"} className="text-3xl font-bold text-neutral ">
            MISSOUT
          </Link>
        </div>
        <Navbar />
        <HeaderTool />
      </div>
    </div>
  );
};

export default HeaderNavbar;
