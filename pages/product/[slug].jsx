import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocalStorage } from "usehooks-ts";
import Breadcrumbs from "../../src/components/Breadcrumbs/Breadcrumbs";
import SliderDetailProduct from "../../src/components/Carousel/SliderDetailProduct";
import CardProduct from "../../src/components/cards/CardProduct";
import MainLayout from "../../src/components/layouts/MainLayout";
import productApi from "../../src/services/ProductApi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

export default function product({ itemProduct }) {
  const { ProductImages, colors, sizes, productRecommends, variants } =
    itemProduct;
  const { user } = useSelector((state) => state.user);

  const [cart, setCart] = useLocalStorage("cart", []);
  const router = useRouter();

  const [active, setActive] = useState({
    colorId: colors[0].id,
    sizeId: sizes[0].id,
  });

  const [quantity, setQuantity] = useState(1);

  const variant = useMemo(() => {
    return variants.find(
      (item) => item.colorId === active.colorId && item.sizeId === active.sizeId
    );
  }, [active]);

  const handleAddToCart = () => {
    const isFound = cart.some((item) => item.variantId === variant.id);
    if (isFound) {
      setCart(
        cart.map((item) =>
          item.variantId === variant.id
            ? { ...item, quantity: item.quantity + variant.quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { variantId: variant.id, quantity }]);
    }

    toast.success("Đã thêm vào giỏ hàng");
  };

  const handleBuyNow = () => {
    const isFound = cart.some((item) => item.variantId === variant.id);
    if (isFound) {
      setCart(
        cart.map((item) =>
          item.variantId === variant.id
            ? { ...item, quantity: item.quantity + variant.quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { variantId: variant.id, quantity }]);
    }
    router.push("/cart");
  };

  return (
    <MainLayout>
      <Breadcrumbs nameCategory={itemProduct.name} />

      <div className="container mx-auto mt-[20px] px-2">
        <div className="wrap grid grid-cols-1 lg:grid-cols-2 ">
          <div className="left">
            <SliderDetailProduct data={ProductImages} />
          </div>
          <div className="right">
            <div className="pb-[10px] border-b-[1px] border-[#dfe0e1] border-dotted">
              <h1 className="text-xl font-bold text-[#5c5c5c] mb-[5px]md:text-3xl">
                {itemProduct.name}
              </h1>
            </div>
            <div className="py-[10px] border-b-[1px] border-[#dfe0e1] border-dotted">
              <span className="text-[#ff0000] font-bold text-lg">
                {`${variant.price.toLocaleString("en-US")}đ`}
              </span>
            </div>
            <div className="color py-[10px] border-b-[1px] border-[#dfe0e1] border-dotted">
              <div className="div flex gap-4">
                {colors.map((item, index) => {
                  return (
                    <p
                      key={index}
                      className={
                        active.colorId !== item.id
                          ? " px-2 h-[40px] flex justify-center  cursor-pointer items-center text-xs font-bold border-[1px] border-[#000] text-[#000]"
                          : " px-2 h-[40px] flex justify-center items-center text-xs font-bold border-[1px] border-[#000] text-[#fff] bg-[#000] cursor-pointer"
                      }
                      onClick={() => setActive({ ...active, colorId: item.id })}
                    >
                      {item.name}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className=" py-[10px] border-b-[1px] border-[#dfe0e1] border-dotted flex gap-4">
              {sizes.map((item, index) => {
                return (
                  <p
                    key={index}
                    className={
                      active.sizeId !== item.id
                        ? "w-[40px] h-[40px] flex justify-center  cursor-pointer items-center text-xs font-bold border-[1px] border-[#000] text-[#000]"
                        : "w-[40px] h-[40px] flex justify-center items-center text-xs font-bold border-[1px] border-[#000] text-[#fff] bg-[#000] cursor-pointer"
                    }
                    onClick={() => setActive({ ...active, sizeId: item.id })}
                  >
                    {item.name}
                  </p>
                );
              })}
            </div>

            <div className="flex  mt-[10px] my-[25px]">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="w-[32px] h-[32px] bg-[#f3f4f4]  rounded  "
              >
                -
              </button>
              <input
                className="w-[70px] outline-none text-center border-y-[1px]"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) =>
                  +e.target.value > 0 && setQuantity(+e.target.value)
                }
              />
              <button
                onClick={() =>
                  quantity < variant.quantity && setQuantity(quantity + 1)
                }
                className="w-[32px] h-[32px] bg-[#f3f4f4] rounded "
              >
                +
              </button>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="w-full uppercase font-bold bg-[#000] text-[#fff] py-[14px] px-[15px] border-[1px] border-[#000] hover:bg-transparent hover:text-[#000] transition-all duration-75"
              >
                thêm giỏ hàng
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full uppercase font-bold bg-[red] text-[#fff] py-[14px] px-[15px] border-[1px] border-[red] hover:bg-transparent hover:text-[#000] transition-all duration-75 "
              >
                mua ngay
              </button>
            </div>
            <div className="mota mt-[20px]">
              <p className="font-bold underline py-[16px]">Mô tả</p>

              <div
                dangerouslySetInnerHTML={{ __html: itemProduct.description }}
              />
            </div>
          </div>
        </div>
        {/* ĐÁNH GIÁ SẢN PHẨM */}
        <div className="danhGiaSanPham mt-[50px]">
          <h2 className="uppercase">ĐÁNH GIÁ SẢN PHẨM</h2>
          <div>
            <div>
              5.0 trên 5
              <div className="rating">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
              </div>
            </div>
            <div className=" flex gap-4">
              <div className="w-12 h-12 ">
                <img
                  src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${
                    user?.name ? user?.name : user?.email
                  }`}
                  className="rounded-full"
                  alt="avatar"
                />
              </div>
              <div className="">
                <h3>Name user</h3>
                <div className="">
                  <div className="rating">
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                      defaultChecked
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                    />
                  </div>
                </div>
                <p>thời gián | phân loại hàng hóa</p>
                <p>discription</p>
                <div>arr img nếu có</div>
              </div>
            </div>
          </div>
        </div>
        <div className="sanPhamLienQuan">
          <h1 className="text-center font-bold text-3xl my-[60px] py-[15px] relative before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:w-[65px] before:h-[1px] before:bg-[#000]">
            Sản phẩm liên quan
          </h1>
          <div className=" mb-6 px-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
            {productRecommends.map((item, index) => {
              return <CardProduct key={index} item={item} />;
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const itemProduct = await productApi.getProductByslug({ query: params });
  return { props: { itemProduct }, revalidate: 60 };
};
