import React, { useState } from "react";
import MainLayout from "../../src/components/layouts/MainLayout";
import productApi from "../../src/services/ProductApi";
import CardProduct from "../../src/components/cards/CardProduct";
import PaginationAdmin from "../../src/components/paginations/PaginationAdmin";
import { useRouter } from "next/router";
import Breadcrumbs from "../../src/components/Breadcrumbs/Breadcrumbs";

export default function collection({ arrProduct }) {
    const router = useRouter();
    console.log({ arrProduct });
    const handleChangeSort = (e) => {
        console.log(e.target.value);
        router.push({ query: { ...router.query, sort: e.target.value } });
    };
    return (
        <MainLayout>
            <Breadcrumbs nameCategory={arrProduct.category?.name} />
            <div className="container mx-auto mb-[60px]">
                <div className="wrap grid grid-cols-3">
                    <div className="wrap-left">
                        <ul className="menu  w-56 p-0 [&_li>*]:rounded-none text-[#5c5c5c] font-[500] text-[14px] mt-[30px]">
                            <li className="cursor-pointer">
                                <a>Sản phẩm nổi bật</a>
                            </li>
                            <li className="cursor-pointer">
                                <a
                                    onClick={() => {
                                        router.push({
                                            query: {
                                                category: "all",
                                            },
                                        });
                                    }}
                                >
                                    Tất cả sản phẩm
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="wrap-right col-span-2">
                        <div className=" flex justify-between items-center mt-[20px] mb-[30px]">
                            <h1 className="uppercase font-bold text-2xl">
                                {arrProduct.category?.name
                                    ? arrProduct.category.name
                                    : "Tất cả sản phẩm"}
                            </h1>
                            <select
                                onChange={handleChangeSort}
                                className="select select-bordered select-sm "
                            >
                                <option>Sản phẩm nổi bật</option>
                                <option value="name-asc">Tên:A-Z</option>
                                <option value="name-desc">Tên:Z-A</option>
                                <option value="createdAt-asc">Cũ nhất</option>
                                <option value="createdAt-desc">Mới nhất</option>
                            </select>
                        </div>

                        {arrProduct.rows.length === 0 ? (
                            <span className="font-blod text-xl text-yellow-400">
                                Không có sản phẩm nào. Với từ khóa '
                                {arrProduct.category.name}'
                            </span>
                        ) : (
                            <div className="wrap_list mb-6 px-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                {arrProduct.rows?.map((item, index) => {
                                    return (
                                        <CardProduct key={index} item={item} />
                                    );
                                })}
                            </div>
                        )}
                        {arrProduct && (
                            <div className="mt-2">
                                <PaginationAdmin
                                    to={
                                        arrProduct.rows.length > 0
                                            ? arrProduct.offset + 1
                                            : 0
                                    }
                                    from={
                                        arrProduct.offset +
                                        arrProduct.rows.length
                                    }
                                    count={arrProduct.count}
                                    pre={
                                        arrProduct.page > 1 &&
                                        arrProduct.page - 1
                                    }
                                    next={
                                        arrProduct.page * arrProduct.limit <
                                            arrProduct.count &&
                                        +arrProduct.page + 1
                                    }
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export const getServerSideProps = async ({ query }) => {
    const arrProduct = await productApi.queryProduct({ query });
    // call api lấy về mảng item prroduct
    return { props: { arrProduct } };
};
