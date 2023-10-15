import React from "react";

const ModalChooseAddress = ({ elementClick }) => {
  return (
    <>
      <label htmlFor="my_modal_6">{elementClick}</label>

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h1 className="pb-2 border-b text-lg font-bold">Địa chỉ của tôi</h1>
          <div className="space-y-2 mt-4 max-h-[350px] overflow-y-auto">
            <div className="flex justify-between py-2">
              <div className="flex gap-4">
                <input
                  type="radio"
                  name="radio-3"
                  className="radio radio-secondary"
                  checked
                />
                <div>
                  <div className="flex gap-2">
                    <h5 className="text-neutral">Thành Đạt</h5>
                    <div className="divider divider-horizontal"></div>
                    <h5>0886249022</h5>
                  </div>
                  <p>
                    222/7c Võ Thành Trang, Phường 11, Quận Tân Bình, TP. Hồ Chí
                    Minh
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="flex gap-4">
                <input
                  type="radio"
                  name="radio-3"
                  className="radio radio-secondary"
                  checked
                />
                <div>
                  <div className="flex gap-2">
                    <h5 className="text-neutral">Thành Đạt</h5>
                    <div className="divider divider-horizontal"></div>
                    <h5>0886249022</h5>
                  </div>
                  <p>
                    222/7c Võ Thành Trang, Phường 11, Quận Tân Bình, TP. Hồ Chí
                    Minh
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <label htmlFor="my_modal_6" className="btn">
              Đóng
            </label>

            <button  className="btn btn-primary">
              Lưu
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalChooseAddress;
