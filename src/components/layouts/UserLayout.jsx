import { getCookie, setCookie } from "cookies-next";
import React, { useEffect } from "react";
import AuthApi from "../../services/AuthApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/UserSlice";
import Header from "../Header/Header";
import Footer from "../Footer";

export default function UserLayout({ children }) {
    const dispatch = useDispatch();
    const getUser = async () => {
        let res = await AuthApi.getMyInfo();
        dispatch(setUser(res));
        setCookie("role", res.role);
    };
    // const getData = async
    useEffect(() => {
        if (getCookie("token")) getUser();
    }, []);
    return (
        <>
            <main>{children}</main>
        </>
    );
}
// de xax thuc nguoi dung
