import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import swal from "sweetalert";
import ColorApi from "../../services/ColorApi";
import SpinnerCenter from "../loadings/SpinnerCenter";
import ModalAddColor from "../modals/ModalAddColor";
import ModalUpdateColor from "../modals/ModalUpdateColor";
import { toast } from "react-hot-toast";

const ColorPage = () => {
  const { data, isLoading } = useQuery(["colors"], ColorApi.getAll);

  const queryClient = useQueryClient()

  const [currentUpdate, setCurrentUpdate] = useState({
    isDisplay: false,
    data: {},
  });

  const { mutate } = useMutation(ColorApi.delete, {
    onSuccess: (res, variables) => {
      queryClient.setQueryData(
        ["colors"],
        data.filter((item) => item.id !== variables)
      );
      toast.success("Xóa color thành công");
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
  };

  return (
    <>
      <div className="flex items-center justify-between mt-2">
        <h1 className="text-lg text-neutral font-bold">Quản lý Color</h1>
        <ModalAddColor
          elementClick={
            <div className="btn btn-success text-base-100">
              <IoMdAdd className="text-xl" />
              Tạo mới
            </div>
          }
        />
      </div>

      <div className="mt-4 bg-base-200 p-4 rounded">
        <div className="overflow-x-auto min-h-[100px] max-h-[550px] relative">
          {!isLoading ? (
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Loại</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item) => (
                  <tr key={item.id}>
                    <th>{item.id}</th>
                    <td>{item.name}</td>
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
                          onClick={() => handleDelete(item.id)}
                          className="btn btn-circle btn-error"
                        >
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
                  <th>Loại</th>
                  <th>Hành động</th>
                </tr>
              </tfoot>
            </table>
          ) : (
            <SpinnerCenter />
          )}
        </div>
      </div>
      <ModalUpdateColor
        data={currentUpdate}
        handleHidden={() => setCurrentUpdate({ isDisplay: false, data: {} })}
      />
    </>
  );
};

export default ColorPage;
