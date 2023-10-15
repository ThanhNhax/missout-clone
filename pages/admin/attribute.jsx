import React, { useState } from "react";
import AdminLayout from "../../src/components/layouts/AdminLayout";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import Meta from "../../src/components/Meta";
import { useRouter } from "next/router";
import ColorPage from "../../src/components/attributes/ColorPage";
import SizePage from "../../src/components/attributes/SizePage";

const AttributeAdmin = () => {
  const router = useRouter();

  const tab = router.query.tab || "size";

  const tabs = [
    {
      tab: "size",
      title: "Quản lý Size",
    },
    {
      tab: "color",
      title: "Quản lý Color",
    },
  ];

  return (
    <>
      <Meta title={"Quản lý blog | MISSOUT"} description="" />
      <AdminLayout>
        <div className="tabs text-neutral">
          {tabs.map((item) => (
            <a
            key={item.tab}
              onClick={() =>
                router.push({
                  query: {
                    tab: item.tab,
                  },
                })
              }
              className={`tab tab-bordered ${
                item.tab === tab ? "tab-active" : ""
              }`}
            >
              {item.title}
            </a>
          ))}
        </div>
              {tab === 'color' ? <ColorPage/> : <SizePage/>}
      </AdminLayout>
    </>
  );
};

export default AttributeAdmin;
