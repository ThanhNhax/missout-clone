import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArrCategory } from "../../redux/slices/CategorySlice";

export default function SanPhamDropdown({ title }) {
    // const { arrCatetgory } = useSelector((state) => state.category);
    const dispatch = useDispatch();
    // call api lấy arrCategory
    // lấy data

    return (
        <details className="dropdown ">
            <summary className=" bg-white border-none menu-navbar  uppercase hover:cursor-pointer slip-left-to-right  uppercase font-bold flex justify-center justify-items-center h-[32px]">
                {title}
            </summary>
            <ul className="p-2 z-10 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                <li>
                    <a>Item 1</a>
                </li>
                <li>
                    <a>Item 2</a>
                </li>
            </ul>
        </details>
    );
}
