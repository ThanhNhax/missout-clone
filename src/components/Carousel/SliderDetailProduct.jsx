import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

const SliderDetailProduct = ({ data }) => {
  return (
    <div className="h-[400px] md:h-[500px]">
      <Swiper
        direction={"vertical"}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <img src={item.src} alt="" className="w-full" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderDetailProduct;
