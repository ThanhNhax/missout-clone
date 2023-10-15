import React from "react";

export default function CarouselHomePages() {
    return (
        <div className="carousel w-full">
            <div id="slide1" className="carousel-item relative w-full">
                <img
                    src="https://file.hstatic.net/200000195489/file/banner_web-01_0b869214f97d45c7a17be4c203be93f7.jpg"
                    className="w-full"
                />
                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle">
                        ❯
                    </a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img
                    src="https://file.hstatic.net/200000195489/file/banner_web_15ad38e33b3e4fefac8f8051a2c8edfd.jpg"
                    className="w-full"
                />
                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle">
                        ❯
                    </a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img
                    src="https://file.hstatic.net/200000195489/file/website_0617672658b14fd798d1511498ae4159.jpg"
                    className="w-full"
                />
                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn btn-circle">
                        ❯
                    </a>
                </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
                <img
                    src="https://file.hstatic.net/200000195489/file/banner_web_b3d6557ba6244c7a8cf7b72d78e7c3d5.jpg"
                    className="w-full"
                />
                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle">
                        ❯
                    </a>
                </div>
            </div>
        </div>
    );
}
