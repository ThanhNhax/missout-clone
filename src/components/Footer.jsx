import React from "react";
import { AiFillFacebook } from "react-icons/ai";
import { FaShare } from "react-icons/fa";

export default function Footer() {
    return (
        <footer>
            <div className="container  md:w-[750px]  lg:w-[970px] 2xl:w-[1300px] mx-auto">
                <div
                    className="hidden
                            md:flex md:flex-wrap md:justify-start md:block
                           
                            flex w-full justify-around mb-[24px]"
                >
                    <div className="md:w-[375px] lg:w-[25%] w-[295px] px-[15px]">
                        <h4 className="text-base font-medium mb-[20px]">
                            GIỚI THIỆU
                        </h4>
                        <div className="w-32">
                            <img
                                src="https://file.hstatic.net/200000195489/file/missout_logo_trans_r_nho_chu_den_03648d8f637c44f283c4131a1c23dbfe.png"
                                alt="img_logo"
                            />
                        </div>
                    </div>
                    <div className="md:w-[375px] xl:w-[325px] px-[15px]">
                        <h4 className="text-base font-medium mb-[20px]">
                            THÔNG TIN LIÊN HỆ
                        </h4>
                        <ul className="pl-[15px]">
                            <li
                                className="text-sm font-medium  leading-7
                            "
                            >
                                <span
                                    className="relative  
                             before:content-[''] 
                             before:absolute 
                             before:w-[7px] 
                             before:h-[1px] 
                             before:bg-[#323232]
                             before:top-[50%]
                             before:translate-y-[-50%]
                             before:left-[-18px]"
                                >
                                    Địa chỉ
                                </span>
                                : CN1: The New Playground, 90 Lê Lai, Q.1. CN2:
                                The New Playground, 26 Lý Tự Trọng, Q.1.
                            </li>
                            <li
                                className="text-sm font-medium relative  
                             before:content-[''] 
                             before:absolute 
                             before:w-[7px] 
                             before:h-[1px] 
                             before:bg-[#323232]
                             before:top-[50%]
                             before:translate-y-[-50%]
                             before:left-[-18px]
                             leading-7"
                            >
                                Điện thoại:0772011702
                            </li>
                            <li
                                className="text-sm font-medium relative  
                             before:content-[''] 
                             before:absolute 
                             before:w-[7px] 
                             before:h-[1px] 
                             before:bg-[#323232]
                             before:top-[50%]
                             before:translate-y-[-50%]
                             before:left-[-18px]
                             leading-7"
                            >
                                Mail: missoutclo.social@gmail.com
                            </li>
                        </ul>
                    </div>
                    <div className="w-[325px] px-[15px]  ">
                        <h4 className="text-base font-medium mb-[20px]">
                            FANPAGE
                        </h4>
                        <div className="relative ">
                            <div
                                className="w-[295px] h-[130px]
                        "
                            >
                                <img
                                    className="h-full 
                                relative
                                before:content-['hello']
                                before:absolute

                                "
                                    src="https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/343437807_3346968672231281_5419045444615982027_n.jpg?stp=dst-jpg_s526x296&_nc_cat=106&ccb=1-7&_nc_sid=dd9801&_nc_ohc=Qo0KQ_BOu6YAX_depHy&_nc_ht=scontent.fsgn13-2.fna&oh=00_AfCxzO0medyVusZQ3CtrCuYxaonAktz7yLVdw-PsYs4DHQ&oe=648A3BAA"
                                    alt="logo"
                                />
                            </div>
                            <div
                                className="border-solid border-white border-2 w-[50px] h-[50px]
                            absolute 
                            top-[8px]
                            left-[8px]
                        "
                            >
                                <img
                                    src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/343435760_285596093798555_1607957150841695479_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=bsCcHVRIf-oAX-aV1lV&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfAQFBuvrEHsZpydpoht1Ly0Fh-6RvnC0XuV4kvF_3TfZg&oe=648B4D17"
                                    alt="logo-fb"
                                />
                            </div>
                            <div
                                className="absolute z-0 
                            top-0 left-[62px]"
                            >
                                <a
                                    className="text-lg font-medium text-[#fff] shadow-[#50d71e]
                            
                            "
                                    href="https://www.facebook.com/missoutclo/?ref=embed_page"
                                >
                                    MISSOUT
                                </a>
                                <p className="text-xs text-[#fff]">
                                    517.639 lượt thích
                                </p>
                            </div>
                            {/* button thích trang  */}
                            <a
                                href="https://www.facebook.com/v10.0/plugins/error/confirm/page?iframe_referer=https%3A%2F%2Fwww.missoutclo.com%2F&kid_directed_site=false&secure=true&plugin=page&return_params=%7B%22adapt_container_width%22%3A%22true%22%2C%22app_id%22%3A%22%22%2C%22channel%22%3A%22https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df256bab720a0638%26domain%3Dwww.missoutclo.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fwww.missoutclo.com%252Ff36a655554c0b2c%26relation%3Dparent.parent%22%2C%22container_width%22%3A%22295%22%2C%22height%22%3A%22300%22%2C%22hide_cover%22%3A%22false%22%2C%22href%22%3A%22https%3A%2F%2Fwww.facebook.com%2Fmissoutclo%22%2C%22locale%22%3A%22vi_VN%22%2C%22sdk%22%3A%22joey%22%2C%22show_facepile%22%3A%22true%22%2C%22show_posts%22%3A%22false%22%2C%22small_header%22%3A%22false%22%2C%22ret%22%3A%22sentry%22%2C%22act%22%3Anull%7D"
                                className="flex items-center
                            bg-[#f5f6f7] 
                            rounded-[2px]
                            w-[102px] h-[24px] 
                            px-[8px]
                            absolute
                            bottom-[8px]
                            left-[8px]
                            "
                            >
                                <AiFillFacebook className="text-[#375798] text-[18px]" />
                                <span className="text-[#4b4f56] font-bold text-[12px]">
                                    Thích Trang
                                </span>
                            </a>
                            {/* Button chia sẽ */}
                            <a
                                href="https://www.facebook.com/sharer/sharer.php?app_id=776730922422337&u=https%3A%2F%2Fwww.facebook.com%2Fmissoutclo%2F&display=popup&ref=embed_page&src=page"
                                className=" 
                            w-[73px]
                            h-[24px]
                            rounded-[2px]
                            flex
                            items-center
                            absolute
                            bottom-[8px]
                            right-[8px]
                            bg-[#f5f6f7]
                            px-[8px]
                            border-[1px]
                            border-solid
                            border-[#0000001f]
                            "
                            >
                                <FaShare className="text-[12px] text-[#4b4f56] mr-[4px]" />
                                <p
                                    className="text-[11px]
                            font-bold
                            "
                                >
                                    Chia sẽ
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t-[1px] border-[#e0d9d6] border-dashed w-full">
                    <p className="text-[#5c5c5c] text-center py-[24px]">
                        Copyright © 2023 MISSOUT. Powered by Haravan
                    </p>
                </div>
            </div>
        </footer>
    );
}
