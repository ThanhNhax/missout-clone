import React, { Children } from "react";
import UserLayout from "./UserLayout";
import Header from "../Header/Header";
import Footer from "../Footer";

export default function MainLayout({ children }) {
    return (
        <>
            <UserLayout>
                <Header></Header>
                <div>{children}</div>
                <Footer></Footer>
            </UserLayout>
        </>
    );
}
