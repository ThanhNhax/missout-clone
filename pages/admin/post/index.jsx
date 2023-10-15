import React from "react";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GoEye } from "react-icons/go";
import Link from "next/link";
import PostApi from "../../../src/services/PostApi";
import SpinnerCenter from "../../../src/components/loadings/SpinnerCenter";
import PaginationAdmin from "../../../src/components/paginations/PaginationAdmin";
import SearchAdmin from "../../../src/components/searchs/SearchAdmin";
import Meta from "../../../src/components/Meta";
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import swal from "sweetalert";
import { toast } from "react-hot-toast";

const PostAdmin = () => {
  const router = useRouter();
  const query = router.query;
  const limit = 6;

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery(["posts", query], () =>
    PostApi.getAll({ ...query, limit })
  );

  const dataSearch = [
    {
      value: "title",
      name: "Tiêu đề",
    },
  ];

  const {mutate} = useMutation(PostApi.delete, {
    onSuccess: (res, variables) => {
     
      queryClient.setQueryData(['post',query], {...data, rows:data.rows.filter(item => item.id !== variables)});
      toast.success("Xóa bài viết thành công");
    },
    onError: (error) => {
      console.log(error);
      error && error.message && toast.error(error.message);
    },
  })

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
      <Meta title={"Quản lý post | MISSOUT"} description="" />
      <AdminLayout>
        <div className="flex items-center justify-between">
          <h1 className="text-lg text-neutral font-bold">Quản lý post</h1>
          <Link href={`/admin/post/add`}>
            <button className="btn btn-success text-base-100">
              <IoMdAdd className="text-xl" />
              Tạo mới
            </button>
          </Link>
        </div>

        <SearchAdmin data={dataSearch} defaultValue="title" />
        <div className="mt-4 bg-base-200 p-4 rounded">
          <div className="overflow-x-auto min-h-[100px] max-h-[550px]">
            {!isLoading ? (
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Hình ảnh</th>
                    <th>Tiêu đề</th>
                    <th>Mô tả</th>
                    <th>Danh mục</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.rows?.map((item) => (
                    <tr key={item.id}>
                      <th>{item.id}</th>
                      <td>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-[80px] rounded aspect-square"
                        />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>{item.Blog.title}</td>
                      <td>
                        <div className="flex gap-2 ">
                          <Link href={`/admin/post/${item.slug}`}>
                          <button className="btn btn-circle btn-warning">
                            <CiEdit className="text-2xl" />
                          </button></Link>
                          <button onClick={() => handleDelete(item.id)} className="btn btn-circle btn-error">
                            <AiOutlineDelete className="text-xl" />
                          </button>
                          <Link href={`/post/${item.slug}`}>
                            <button className="btn btn-circle btn-primary">
                              <GoEye className="text-xl" />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>#</th>
                    <th>Hình ảnh</th>
                    <th>Tiêu đề</th>
                    <th>Mô tả</th>
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
      </AdminLayout>
    </>
  );
};

export default PostAdmin;
