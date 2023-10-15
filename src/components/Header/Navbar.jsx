import React, { useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getArrCategory } from "../../redux/slices/CategorySlice";
import { getArrBlogs } from "../../redux/slices/BlogsSlice";
import { useRouter } from "next/router";

const Navbar = () => {
    const { arrCategory } = useSelector((state) => state.category);
    // render quá nhiều lần
    const { arrCollectionBlogs } = useSelector((state) => state.blogs);
    const router = useRouter();
    // console.log({ arrCollectionBlogs });
    const dispatch = useDispatch();
    useEffect(() => {
        // call api lấy categotry
        let action = getArrCategory();
        dispatch(action);
        let actionCallCollectionBlogs = getArrBlogs();
        dispatch(actionCallCollectionBlogs);
        // call api lấy collection blogs
    }, []);
    return (
        <div className=" hidden md:block">
            <ul className="flex items-center mt-4 justify-center gap-6 ">
                <div className="menu-navbar relative">
                    <li className="flex hover:cursor-pointer slip-left-to-right  pb-2 items-end uppercase font-bold">
                        <span>Sản phẩm</span>
                        <BiChevronDown className="text-xl" />
                    </li>
                    <ul
                        tabIndex={0}
                        className="menu-child-navbar z-10 fixed  shadow bg-base-100 rounded-sm uppercase font-bold w-28 gap-y-2 transition-all"
                    >
                        {arrCategory?.map((item, index) => (
                            <div
                                onClick={() =>
                                    router.push(`/collections/${item.slug}`)
                                }
                                key={index}
                            >
                                <li className="first:pt-3 hover:text-black border-b last:border-none hover:cursor-pointer pt-1 px-2 pb-2">
                                    {item.name}
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
                <Link href={"/about"}>
                    <li className="flex hover:cursor-pointer slip-left-to-right relative pb-2 items-end uppercase font-bold">
                        About us
                    </li>
                </Link>

                <div className="menu-navbar relative">
                    <li className="flex hover:cursor-pointer slip-left-to-right  pb-2 items-end uppercase font-bold">
                        <span>Blogs</span>
                        <BiChevronDown className="text-xl" />
                    </li>
                    <ul
                        tabIndex={0}
                        className="menu-child-navbar z-10 fixed  shadow bg-base-100 rounded-sm uppercase font-bold w-28 gap-y-2 transition-all"
                    >
                        {arrCollectionBlogs?.length !== 0 ? (
                            arrCollectionBlogs?.map((item, index) => (
                                <div
                                    onClick={() =>
                                        router.push(`/blogs/${item.slug}`)
                                    }
                                    key={index}
                                >
                                    <li className="first:pt-3 hover:text-black border-b last:border-none hover:cursor-pointer pt-1 px-2 pb-2">
                                        {item.title}
                                    </li>
                                </div>
                            ))
                        ) : (
                            <li>Không có dữ liệu</li>
                        )}
                    </ul>
                </div>

                <Link href={"/about"}>
                    <li className="flex hover:cursor-pointer slip-left-to-right relative pb-2 items-end uppercase font-bold">
                        Liên hệ
                    </li>
                </Link>
            </ul>
        </div>
    );
};

export default Navbar;
