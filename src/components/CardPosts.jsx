import React from "react";

export default function CardPosts() {
    return (
        <div>
            <article className="mb-[25px]  grid grid-cols-1  px-[15px] lg:grid-cols-4 lg:gap-4">
                <div className=" mb-[20px] lg:col-span-1 overflow-hidden">
                    <a href="#" className="">
                        <img
                            className="hover:scale-[120%] ease-in-out duration-500 transition-all
                            hover:ease-in-out hover:duration-500 hover:transition-all "
                            src="https://file.hstatic.net/200000195489/article/z3627411967869_a3d58173d126bcc73177002477e6456f_0aa5dd3ad1bd4f2ea596de911d2630e0_grande.jpg"
                            alt="img_post"
                        />
                    </a>
                </div>
                <div className="post_title lg:col-span-3">
                    <h3>
                        <a
                            href="#"
                            className="text-[#5c5c5c] text-[16px] uppercase font-medium ease-in-out duration-200 transition-all
                            hover:ease-in-out hover:duration-200 hover:transition-all hover:text-[#000000]"
                        >
                            Name Posts
                        </a>
                    </h3>
                    <div className=" text-[#999] mb-[15px] text-[14px] font-medium">
                        {/* truyen tư api vào nhé */}
                        <span>Người viết: lakyky123@icloud.com</span>
                        {/* truyền ngày đã viết nhé */}
                        <span>08.08.2022</span>
                    </div>
                    {/* Mô tả ngắn về bài post đó */}
                    <p className="leading-5 mb-[10px] text-[14px] font-medium">
                        Bạn tìm việc khó, đã có MISSOUT đây?Vì MISSOUT đang tìm
                        kiếm những mảnh ghép còn sót lại cho team, chúng mình
                        đang ngày đêm mong mỏi...
                    </p>
                </div>
            </article>
        </div>
    );
}
