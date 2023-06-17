import React, { useState } from "react";
import AdminLayout from "../../src/components/layouts/AdminLayout";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import ModalAddUser from "../../src/components/modals/ModalAddUser";
import Meta from "../../src/components/Meta";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserApi from "../../src/services/UserApi";
import PaginationAdmin from "../../src/components/paginations/PaginationAdmin";
import { useRouter } from "next/router";
import SpinnerCenter from "../../src/components/loadings/SpinnerCenter";
import ModalUpdateUser from "../../src/components/modals/ModalUpdateUser";
import { BiLockAlt } from "react-icons/bi";
import swal from "sweetalert";
import { toast } from "react-hot-toast";

const UserAdmin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const query = router.query;

  const [typeSearch, setTypeSearch] = useState("name");
  const [search, setSearch] = useState("");

  const [currentUpdate, setCurrentUpdate] = useState({
    isDisplay: false,
    data: {},
  });

  const limit = 6;

  const { data, isLoading, refetch } = useQuery(["users", query], () =>
    UserApi.getAll({ ...query, limit })
  );

  const { mutate } = useMutation(UserApi.lockUser, {
    onSuccess: (id) => {
      const newRows = data.rows.map((item) =>
        item.id === id ? { ...item, isActive: false } : item
      );
      queryClient.setQueryData(["users", query], { ...data, rows: newRows });
      toast.success("Khóa tài khoản thành công");
    },
    onError: (error) => {
      console.log(error);
      error && error.message && toast.error(error.message);
    },
  });

  const handleSearch = () => {
    router.push({ query: { [typeSearch]: search } });
  };

  const handleLockUser = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutate(id);
      }
    });
  };

  return (
    <>
      <Meta title={"Quản lý người dùng | MISSOUT"} description="" />
      <AdminLayout>
        <div className="flex items-center justify-between">
          <h1 className="text-lg text-neutral font-bold">Quản lý người dùng</h1>
          <div>
            <ModalAddUser
              query={query}
              elementClick={
                <div className="btn btn-success text-base-100">
                  {" "}
                  <IoMdAdd className="text-xl" />
                  Tạo mới
                </div>
              }
            />
          </div>
        </div>

        <div className="join mt-2">
          <div>
            <div>
              <input
                className="input input-bordered join-item"
                placeholder="Tìm kiếm người dùng..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <select
            value={typeSearch}
            onChange={(e) => setTypeSearch(e.target.value)}
            className="select select-bordered join-item"
          >
            <option value="name">Tên</option>
            <option value="email">Email</option>
            <option value="phone">SDT</option>
          </select>
          <div className="indicator">
            <button className="btn join-item" onClick={handleSearch}>
              Tìm kiếm
            </button>
          </div>
        </div>
        <div className="mt-4 bg-base-200 p-4 rounded">
          <div className="overflow-x-auto relative min-h-[100px]">
            {!isLoading ? (
              <table className="table table-zebra w-full ">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Tên</th>
                    <th>Quyền</th>
                    <th>Số điện thoại</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.rows?.map((item) => (
                    <tr key={item.id}>
                      <th>{item.id}</th>
                      <td>{item.email}</td>
                      <td>{item.name || "Chưa có"}</td>
                      <td className="capitalize">{item.role}</td>
                      <td>{item.phone || "Chưa có"}</td>
                      <td>{item.isActive ? "Hoạt động" : "Khóa"}</td>
                      <td>
                        <div className="flex gap-2 ">
                          <button
                            onClick={() =>
                              setCurrentUpdate({ isDisplay: true, data: item })
                            }
                            className="btn btn-circle btn-warning"
                          >
                            <CiEdit className="text-2xl" />
                          </button>

                          <button
                            onClick={() => handleLockUser(item.id)}
                            className="btn btn-circle btn-error"
                          >
                            <BiLockAlt className="text-xl" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Tên</th>
                    <th>Số điện thoại</th>
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
        <ModalUpdateUser
          query={query}
          data={currentUpdate}
          handleHidden={() => setCurrentUpdate({ isDisplay: false, data: {} })}
        />
      </AdminLayout>
    </>
  );
};

export default UserAdmin;
