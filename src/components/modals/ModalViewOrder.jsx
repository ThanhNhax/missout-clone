import { ErrorMessage, Field } from "formik";
import React from "react";
import { formatPrice } from "../../utils/formatPrice";

const ModalViewOrder = ({ data, handleHidden }) => {
  return (
    <>
      {data.isDisplay && (
        <div className="modal opacity-100 visible pointer-events-auto">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Chi tiết đơn hàng</h3>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4>Đơn hàng: {data.data.id}</h4>
                <h4>Tổng tiền: {formatPrice(data.data.total)}</h4>
              </div>
              <div className="">
                <h4>Người mua: {data.data.Info.name} - {data.data.Info.phone}</h4>
                <h4>Địa chỉ: {data.data.Info.address}</h4>
              </div>
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.OrderDetails?.map((item,index) => {

                    return (
                      <tr key={item.id}>
                        <th>{index + 1}</th>
                        <td>{item.variant.Product.name} - {item.variant.Size.name} / {item.variant.Color.name} </td>
                        <td>{formatPrice(item.price)}</td>
                        <td>{item.quantity} sản phẩm</td>
                        <td>{formatPrice(item.price * item.quantity)}</td>
                     
                      </tr>
                    );
                  })}
                </tbody>
               
              </table>
            </div>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}

              <div className="flex items-center justify-between w-full">
                <label onClick={handleHidden} className="btn">
                  Đóng
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalViewOrder;
