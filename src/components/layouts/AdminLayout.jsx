import React from "react";
import HeaderAdmin from "../Header/HeaderAdmin";
import adminbars from "../data/adminbar";
import Link from "next/link";

import AdminBar from "../Header/AdminBar";
import UserLayout from "./UserLayout";

const AdminLayout = ({ children }) => {
  return (
    <UserLayout>
      <div className="flex min-h-screen ">
        <div className="hidden md:block">
          <AdminBar />
        </div>
        <div className="flex-1 px-2">
          <HeaderAdmin />
          <div className="mt-2">{children}</div>
        </div>
      </div>
    </UserLayout>
  );
};

export default AdminLayout;
