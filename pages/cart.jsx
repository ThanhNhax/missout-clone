import React, { useEffect, useState } from "react";
import MainLayout from "../src/components/layouts/MainLayout";
import { AiOutlineDelete } from "react-icons/ai";
import CardCart from "../src/components/cards/CardCart";
import ModalChooseAddress from "../src/components/modals/ModalChooseAddress";
import { useLocalStorage } from "usehooks-ts";
import productApi from "../src/services/ProductApi";

const Cart = () => {
  const [cart, setCart] = useLocalStorage("cart", []);

  const [products, setProducts] = useState([])

  useEffect(() => {
    
    const confirmCart = async() => {
      const result = await productApi.confirmCart(cart.map(item => item.variantId));
      setProducts(result.map(item => {
        const quantity = cart.find(item => item.variantId === item.id)?.quantity;
        return {...item, quantity}
      }))
    }
    if(cart.length > 0){
      confirmCart()
    }
  },[])
  
  return (
    <MainLayout>
      <div className="min-h-[70vh] max-w-[1200px] mx-auto pb-10">
        <div className="text-sm breadcrumbs font-bold">
          <ul>
            <li>
              <a>Trang chủ</a>
            </li>
            <li>Giỏ hàng</li>
          </ul>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <h1 className="uppercase text-center text-xl md:text-3xl font-bold mt-2">
              Giỏ hàng của bạn
            </h1>
            <div className="p-4 bg-base-200 mt-4">
              <h3 className="font-bold">
                Bạn đang có 3 sản phẩm trong giỏ hàng
              </h3>
              <div className="mt-4 space-y-2">
                {products?.map((item) => (
                  <CardCart key={item} {...item} />
                ))}
              </div>
            </div>
          </div>
          <div className="w-full md:w-[250px] mt-2 md:mt-[60px] ">
            <div className="border p-4 rounded space-y-4">
              <h2 className="font-bold border-none md:border-b pb-2">Thông tin đơn hàng</h2>
              <div className="flex border-b pb-2 items-center justify-between font-bold">
                <h3>Tổng tiền:</h3>
                <h3> {(329000).toLocaleString("en-US")}đ</h3>
              </div>
              <div className="">
                <h3 className="font-bold">Địa chỉ nhận hàng</h3>
                <h3 className="mt-1">
                  Lý Thành Đạt (+84) 886249022 222/7c Võ Thành Trang, Phường 11,
                  Quận Tân Bình, TP. Hồ Chí Minh
                </h3>
               <ModalChooseAddress elementClick={ <div className="btn mt-2 btn-sm text-secondary">Thay đổi</div>}/>
              </div>
              <button className="btn btn-secondary mt-2 w-full">
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cart;
