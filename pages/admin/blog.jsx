import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import swal from "sweetalert";
import Meta from "../../src/components/Meta";
import AdminLayout from "../../src/components/layouts/AdminLayout";
import SpinnerCenter from "../../src/components/loadings/SpinnerCenter";
import ModalAddBlog from "../../src/components/modals/ModalAddBlog";
import ModalUpdateBlog from "../../src/components/modals/ModalUpdateBlog";
import BlogApi from "../../src/services/BlogApi";
import CategoryApi from "../../src/services/CategoryApi";

const BlogAdmin = () => {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery(["blogs"], BlogApi.getAll);

  const [currentUpdate, setCurrentUpdate] = useState({
    isDisplay: false,
    data: {},
  });

  const { mutate } = useMutation(BlogApi.delete, {
    onSuccess: (res, variables) => {
     
      queryClient.setQueryData(['blogs'], data.filter(item => item.id !== variables));
      toast.success("Xóa danh mục thành công");
    },
    onError: (error) => {
      console.log(error);
      error && error.message && toast.error(error.message);
    },
  });

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutate(id);
      }
    });
  }

  return (
    <>
      <Meta title={"Quản lý danh mục | MISSOUT"} description="" />
      <AdminLayout>
        <div className="flex items-center justify-between">
          <h1 className="text-lg text-neutral font-bold">Quản lý danh mục blog</h1>
          <ModalAddBlog
            elementClick={
              <div className="btn btn-success text-base-100">
                <IoMdAdd className="text-xl" />
                Tạo mới
              </div>
            }
          />
        </div>

        <div className="mt-4 bg-base-200 p-4 rounded">
          <div className="overflow-x-auto min-h-[100px] max-h-[500px] relative">
            {!isLoading ? (
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Slug</th>
                    <th>Tên</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item) => (
                    <tr key={item.id}>
                      <th>{item.id}</th>
                      <td>{item.slug}</td>
                      <td>{item.title}</td>
                      <td>
                        <div className="flex gap-2 ">
                          <button onClick={() => setCurrentUpdate({isDisplay:true, data:item})} className="btn btn-circle btn-warning">
                            <CiEdit className="text-2xl" />
                          </button>
                          <button onClick={() => handleDelete(item.id)} className="btn btn-circle btn-error">
                            <AiOutlineDelete className="text-xl" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>#</th>
                    <th>Slug</th>
                    <th>Tên</th>
                    <th>Hành động</th>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <SpinnerCenter />
            )}
          </div>
        </div>
        <ModalUpdateBlog
          data={currentUpdate}
          handleHidden={() => setCurrentUpdate({ isDisplay: false, data: {} })}
        />
      </AdminLayout>
    </>
  );
};

export default BlogAdmin;
