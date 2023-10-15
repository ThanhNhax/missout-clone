import React from "react";
import MainLayout from "../src/components/layouts/MainLayout";
import productApi from "../src/services/ProductApi";
import CardProduct from "../src/components/cards/CardProduct";
import { useRouter } from "next/router";
import PaginationAdmin from "../src/components/paginations/PaginationAdmin";

export default function search({ arrProduct }) {
    const router = useRouter();

    return (
        <MainLayout>
            <div className="py-[30px]">
                <div className=" text-center pb-[30px]">
                    <h1 className="text-[30px] mb-[10px] font-bold">
                        Tìm kiếm
                    </h1>
                    <p
                        className="relative opacity-60 h-[48px] text-[14px] font-[600]
                        before::content-[''] 
                        before:absolute
                        before:w-[60px]
                        before:h-[4px]
                        before:bg-[#252a2b]
                        before:bottom-0
                        before:left-[50%]
                        before:translate-x-[-50%]
                        "
                    >
                        Có {arrProduct.count} sản phẩm cho tìm kiếm
                    </p>
                </div>
                <div className="container mx-auto">
                    <p className="text-[14px] font-[600]">
                        Kết quả tìm kiếm cho "{router.query.name}".
                    </p>
                    {/* list item product load ra o day */}
                    <div className="wrap_list mb-6 px-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {arrProduct.rows?.map((item, index) => {
                            return <CardProduct key={index} item={item} />;
                        })}
                    </div>
                    {/* list item product load ra o day */}
                    {/* Pagination */}
                    {arrProduct && (
                        <div className="mt-2">
                            <PaginationAdmin
                                to={
                                    arrProduct.rows.length > 0
                                        ? arrProduct.offset + 1
                                        : 0
                                }
                                from={
                                    arrProduct.offset + arrProduct.rows.length
                                }
                                count={arrProduct.count}
                                pre={arrProduct.page > 1 && arrProduct.page - 1}
                                next={
                                    arrProduct.page * arrProduct.limit <
                                        arrProduct.count && +arrProduct.page + 1
                                }
                            />
                        </div>
                    )}
                    {/* End Pagination */}
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
