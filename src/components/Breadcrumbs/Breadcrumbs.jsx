import React from "react";
import { useRouter } from "next/router";

export default function Breadcrumbs({ nameCategory }) {
    const router = useRouter();
    return (
        <div
            className="
            w-full
            relative before:content-['']
            before:absolute
            before:bottom-0
            before:left-0
            before:w-full
            before:h-[1px]
            before:bg-[#e5e7eb]
            mb-[20px]"
        >
            <div className="container mx-auto px-[15px]">
                <div className=" text-sm breadcrumbs">
                    <ul>
                        <li>
                            <a
                                onClick={() => {
                                    router.push("/");
                                }}
                            >
                                Trang chủ
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    router.push("/collections/all");
                                }}
                            >
                                Danh mục
                            </a>
                        </li>
                        <li className="uppercase">
                            {nameCategory ? nameCategory : "Tất cả sản phẩm"}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
