"use client";

import { KEY } from "@/app/constants/role";
import { getUserInfo } from "@/app/utils/auth";
import { message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiMenu3Fill } from "react-icons/ri";
import { NavbarItems } from "../app/constants/NavbarItems";
import Logo from "./Logo";

const Navbar = () => {
  const { role } = getUserInfo() as any;
  const router = useRouter();

  const menuItems = NavbarItems(role);

  const handleLogout = async () => {
    try {
      localStorage.removeItem(KEY);

      setTimeout(() => {
        message.success("Logged out");
      }, 1000);

      router.push("/login");
    } catch (error) {
      message.error("Logout failed");
    }
  };

  return (
    <nav className="z-50 sticky">
      <div
        className="
          flex 
          justify-between 
          items-center
          md:px-12
          px-4
          h-16
          border-b
          bg-white/30
          backdrop-blur-2xl
          gap-5
          container
          mx-auto
        "
      >
        <div>
          <Logo />
        </div>
        <div className="drawer drawer-end text-lg w-7 bg-orange-200 px-1 py-1 flex justify-center items-center rounded-full hover:bg-orange-300 transition duration-300">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer-4" className="hover:cursor-pointer">
              <RiMenu3Fill />
            </label>
          </div>
          <div className="drawer-side mt-16">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-white text-base-content z-50">
              {menuItems &&
                menuItems.map((item) => (
                  <Link
                    href={item.href}
                    key={item.key}
                    className="mb-2 p-2 hover:bg-orange-100 rounded-md hover:font-medium transition"
                  >
                    {item.label}
                  </Link>
                ))}
              {role && (
                <li
                  className="p-2 hover:bg-orange-100 cursor-pointer hover:font-medium transition rounded-md"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
