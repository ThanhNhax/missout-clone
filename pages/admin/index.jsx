import React from "react";
import AdminLayout from "../../src/components/layouts/AdminLayout";
import Meta from "../../src/components/Meta";

const AdminDashBoard = () => {
  return (
   <>
    <Meta title={'Dashboard | MISSOUT'} description=""/>
   <AdminLayout>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 ">
        <div className="rounded-sm p-4 bg-info font-bold text-center text-base-100">
          <h2 className="text-2xl">26</h2>
          <p>Người dùng</p>
        </div>
        <div className="rounded-sm p-4 bg-success font-bold text-center text-base-100">
          <h2 className="text-2xl">26</h2>
          <p>Sản phẩm</p>
        </div>
        <div className="rounded-sm p-4 bg-warning font-bold text-center text-base-100">
          <h2 className="text-2xl">26</h2>
          <p>Bài viết</p>
        </div>
        <div className="rounded-sm p-4 bg-error font-bold text-center text-base-100">
          <h2 className="text-2xl">26</h2>
          <p>Đơn hàng</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        <div className="bg-base-200 rounded  p-4 mt-4 w-full ">
          <div className="overflow-x-auto h-[550px]">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <tr key={item}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src="https://ui-avatars.com/api/?name=John+Doe"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">Hart Hagerty</div>
                          <div className="text-sm opacity-50">
                            United States
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      Zemlak, Daniel and Leannon
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        Desktop Support Technician
                      </span>
                    </td>
                    <td>Purple</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
              <tfoot>
                <tr>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="bg-base-200 rounded mt-4 p-4 w-full md:w-[400px]">
          <h3 className="font-bold">Bài viết gần đây</h3>
          <ul className="overflow-auto h-[550px]">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <li key={item} className="py-2 ">
                <h3 className="flex-1 link link-hover">Zemlak, Daniel and Leannon</h3>
                <span className="text-sm border-l">1 phút trước</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminLayout></>
  );
};

export default AdminDashBoard;
