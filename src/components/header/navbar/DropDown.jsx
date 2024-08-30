// DropDown.js
import { motion } from "framer-motion";
import React from "react";
import { IoTriangle } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";

const DropDown = ({ remainingCategories, toggleMenu, toggleDropdown }) => {
  const location = useLocation();
  if (remainingCategories.length === 0) return <></>;
  return (
    <div
      onMouseOver={() => {
        toggleDropdown();
      }}
      className={`group relative z-50 flex  w-full cursor-pointer items-center gap-2  px-4 py-4 text-navTextColor hover:bg-navbarBgColor hover:text-opacity-75 md:w-auto md:font-semibold lg:text-[17px]`}
    >
      अन्य
      <IoTriangle className="rotate-180 cursor-pointer text-xs font-thin" />
      <li className="absolute  -left-4 top-14 z-50 hidden h-auto     w-screen flex-col rounded-b-lg bg-navbarBgColor  px-5 pb-5  pt-2  text-[15px] transition-all duration-1000 ease-in-out  group-hover:flex  md:-left-10 md:w-36  md:px-0 md:pb-3">
        {remainingCategories?.map((cat, i) => (
          <NavLink
            onClick={toggleMenu}
            to={decodeURIComponent(cat.slug)}
            key={i}
            className=" cursor-pointer  truncate rounded-lg py-3 pl-3 pr-1 text-navTextColor drop-shadow-lg hover:bg-navbarBgColor  hover:brightness-125  md:rounded-none"
          >
            {cat.name}
          </NavLink>
        ))}
      </li>
    </div>
  );
};

export default DropDown;
