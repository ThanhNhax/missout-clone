import Link from "next/link";
import React from "react";
import AdminBar from "./AdminBar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/UserSlice";
import { useRouter } from "next/router";

const HeaderAdmin = () => {
  const { user } = useSelector((state) => state.user);

  const router = useRouter()
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login')
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        {/* Icon Bar in PC */}
        <div className="btn btn-ghost btn-circle hidden md:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>

        {/* Icon bar and drawer in mobile */}
        <div className="drawer flex md:hidden">
          <input id="my-drawer" type="checkbox" className="drawer-toggle " />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer"
              className="drawer-button  btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
          </div>
          <div className="drawer-side z-50">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="bg-base-100 h-full">
              <AdminBar />
            </ul>
          </div>
        </div>
      </div>
      <div className="navbar-center">
        <Link
          href={"/"}
          className="btn btn-ghost normal-case text-xl text-neutral"
        >
          MISSOUT
        </Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className=" ">
            <div className="avatar cursor-pointer">
              <div className="w-12 mask mask-circle">
                <img
                  src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${
                    user?.name ? user?.name : user?.email?.split("@")[0]
                  }`}
                />
              </div>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow-md z-50 bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/profile">Thông tin cá nhân</Link>
            </li>
            <li onClick={handleLogout}>
              <a >Đăng xuất</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
