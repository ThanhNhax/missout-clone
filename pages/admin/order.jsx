import React, { useState } from "react";
import AdminLayout from "../../src/components/layouts/AdminLayout";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import Meta from "../../src/components/Meta";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import OrderApi from "../../src/services/OrderApi";
import SpinnerCenter from "../../src/components/loadings/SpinnerCenter";
import PaginationAdmin from "../../src/components/paginations/PaginationAdmin";
import { formatPrice } from "../../src/utils/formatPrice";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import Link from "next/link";
import { GoEye } from "react-icons/go";
import ModalUpdateOrder from "../../src/components/modals/ModalUpdateOrder";
import ModalViewOrder from "../../src/components/modals/ModalViewOrder";

const OrderAdmin = () => {
  const router = useRouter();
  registerLocale("vi", vi);

  const query = router.query;
  const limit = 6;

  const { data, isLoading } = useQuery(["orders", query], () =>
    OrderApi.getAll({ ...query, limit })
  );

  const [currentUpdate, setCurrentUpdate] = useState({
    isDisplay: false,
    data: {},
  });
  const [currentView, setCurrentView] = useState({
    isDisplay: false,
    data: {},
  });

  console.log(currentView, currentUpdate)
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleSearch = () => {
    if (startDate && endDate) {
      router.push({
        query: {
          ...query,
          startDate: dayjs(startDate).format("YYYY-MM-DD"),
          endDate: dayjs(endDate).format("YYYY-MM-DD"),
        },
      });
      return;
    }

    router.push({ query: { ...query } });
  };

  return (
    <>
      <Meta title={"Quản lý đơn hàng | MISSOUT"} description="" />
      <AdminLayout>
        <div className="flex items-center justify-between">
          <h1 className="text-lg text-neutral font-bold">Quản lý đơn hàng</h1>
        </div>

        <div className="join mt-2">
          <div className="flex items-center flex-col md:flex-row">
            <DatePicker
              locale={"vi"}
              className="input input-bordered"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Ngày bắt đầu"
            />
            <span className="px-2">to</span>
            <DatePicker
              locale={"vi"}
              className="input input-bordered"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="Ngày kết thúc"
            />
          </div>
          <select
            onChange={(e) => {
              if (e.target.value) {
                router.push({ query: { ...query, status: e.target.value } });
              } else {
                const query = router.query;
                delete query["status"];
                router.push({ query: { ...query } });
              }
            }}
            className="select select-bordered ml-1 join-item"
          >
            <option value="">Tất cả</option>
            <option value={2}>Đã giao</option>
            <option value={1}>Đang xử lý</option>
            <option value={0}>Đã hủy</option>
          </select>
          <div className="indicator">
            <button onClick={handleSearch} className="btn join-item">
              Tìm kiếm
            </button>
          </div>
        </div>
        <div className="mt-4 bg-base-200 p-4 rounded">
          <div className="overflow-x-auto min-h-[100px] max-h-[550px] relative">
            {!isLoading ? (
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Người mua</th>
                    <th>Tổng tiền</th>
                    <th>Số sản phẩm</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.rows?.map((item) => {
                    let text = "";
                    switch (+item.status) {
                      case 0:
                        text = "Đã hủy";
                        break;
                      case 1:
                        text = "Đang xử lý";
                        break;
                      case 2:
                        text = "Đã giao";
                        break;
                    }

                    return (
                      <tr key={item.id}>
                        <th>{item.id}</th>
                        <td>{item.Info.name}</td>
                        <td>{formatPrice(item.total)}</td>
                        <td>{item.OrderDetails.length || 0} sản phẩm</td>
                        <td>{text}</td>
                        <td>{dayjs(item.createdAt).format("DD/MM/YYYY")}</td>
                        <td>
                          <div className="flex gap-2 ">
                            <button
                              disabled={item.status == 2 || item.status == 0}
                              onClick={() =>
                                setCurrentUpdate({
                                  isDisplay: true,
                                  data: item,
                                })
                              }
                              className="btn btn-circle btn-warning"
                            >
                              <CiEdit className="text-2xl" />
                            </button>
                            <button
                              onClick={() =>
                                setCurrentView({ isDisplay: true, data: item })
                              }
                              className="btn btn-circle btn-primary"
                            >
                              <GoEye className="text-xl" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th>#</th>
                    <th>Người mua</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <SpinnerCenter />
            )}
          </div>
          {data && (
            <div className="mt-2">
              <PaginationAdmin
                to={data.rows.length > 0 ? data.offset + 1 : 0}
                from={data.offset + data.rows.length}
                count={data.count}
                pre={data.page > 1 && data.page - 1}
                next={data.page * data.limit < data.count && +data.page + 1}
              />
            </div>
          )}
        </div>
        <ModalUpdateOrder
          query={query}
          data={currentUpdate}
          handleHidden={() => setCurrentUpdate({ isDisplay: false, data: {} })}
        />
        <ModalViewOrder
          data={currentView}
          handleHidden={() => setCurrentView({ isDisplay: false, data: {} })}
        />
      </AdminLayout>
    </>
  );
};

export default OrderAdmin;
