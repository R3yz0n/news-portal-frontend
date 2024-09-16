import React from "react";
import { NavLink } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../../utils/navbarStyles";
import Logo from "../../assests/Logo.png";

const navigationItems = [
  { path: "/admin/home", label: "Home" },
  { path: "/admin/user", label: "User" },
  { path: "/admin/client", label: "Client" },
  { path: "/admin/post", label: "Posts" },
  { path: "/admin/company", label: "Company" },
  { path: "/admin/category", label: "Categories" },
  { path: "/admin/advertisement", label: "Advertisement" },
  { path: "/admin/advertises", label: "Advertises" },
  { path: "/admin/transactions", label: "Transactions" },
];

const DBLeft = () => {
  return (
    <section className="min-w-210 hidden h-full w-[200px] flex-col gap-3 bg-gradient-to-r from-gray-100 to-gray-300 px-[11px] py-2 shadow-md backdrop-blur-md md:flex">
      <NavLink
        to="/"
        className="items flex items-center justify-start gap-4 pl-1 pt-2 text-2xl"
      >
        <img src={Logo} className="w-25 mb-5" alt="Nepathya Media" />
      </NavLink>
      <hr className="border-gray-400" />

      <ul className="flex flex-col gap-3 ">
        {navigationItems.map((item, index) => (
          <NavLink
            key={index}
            className={({ isActive }) =>
              isActive
                ? `${isActiveStyles} border-l-8 border-red-500 px-4 py-2`
                : isNotActiveStyles
            }
            to={item.path}
          >
            {item.label}
          </NavLink>
        ))}
      </ul>
    </section>
  );
};

export default DBLeft;
