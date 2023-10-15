import React, { useEffect, useRef } from "react";
import HeaderTop from "./HeaderTop";
import Navbar from "./Navbar";
import HeaderNavbar from "./HeaderNavbar";
import useScrollY from "../../hooks/useScrollY";

const Header = () => {
    const headerRef = useRef(null);
    const scrollY = useScrollY();
    return (
        <div
            ref={headerRef}
            className="bg-base-100 pt-3 px-2 border-b pb-2 md:pb-0"
        >
            <HeaderTop />
            <Navbar />
            <div className="hidden md:block">
                <HeaderNavbar
                    display={
                        headerRef && scrollY >= headerRef?.current?.clientHeight
                            ? "block"
                            : "none"
                    }
                />
            </div>
        </div>
    );
};

export default Header;
