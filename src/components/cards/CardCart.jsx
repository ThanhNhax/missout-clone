import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const CardCart = ({Product, price}) => {
  return (
    <div className="flex md:items-center flex-col md:flex-row">
      <div className="flex gap-2 items-center w-full md:w-[40%]">
        <img
          src="https://product.hstatic.net/200000195489/product/z3997993659846_f19dd946aa80afd300990f9a484f1bb4_765002395c1b4c65afcc8e91acffc518_medium.jpg"
          alt=""
          className="w-[100px] rounded"
        />
        <div className="">
          <h4 className="uppercase font-bold text-neutral">{Product.name}</h4>
          <p className="uppercase">S / Blue</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full md:w-[60%]">
        <div className="flex ">
          <button className="w-[32px] h-[32px] bg-gray-400 opacity-80 rounded-l hover:opacity-100 ">
            -
          </button>
          <input
            className="w-[50px] text-center border-y-[1px] outline-none"
            type="text"
            min={1}
            defaultValue={1}
          />
          <button className="w-[32px] h-[32px] bg-gray-400 opacity-80 rounded-r hover:opacity-100">
            +
          </button>
        </div>
        <div className="font-bold">{(price).toLocaleString("en-US")}đ</div>
        <div className="flex flex-col items-center">
          <h5>Thành tiền</h5>
          <p className="text-secondary font-bold">
            {(329000).toLocaleString("en-US")}đ
          </p>
          <AiOutlineDelete className="text-xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default CardCart;
