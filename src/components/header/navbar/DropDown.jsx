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
      className={`lg:text-[17px] hover:bg-navbarBgColor hover:text-opacity-75  relative cursor-pointer z-50  md:font-semibold text-navTextColor flex gap-2 items-center group py-4 px-4`}
    >
      अन्य
      <IoTriangle className="rotate-180 text-xs cursor-pointer font-thin" />
      <li className="absolute  text-[15px] top-14 z-50 w-screen hidden     md:w-36 px-5 md:px-0 -left-4  md:-left-10 h-auto  bg-navbarBgColor  pt-2 pb-5 md:pb-3 rounded-b-lg  group-hover:flex  flex-col ease-in-out  transition-all duration-1000">
        {remainingCategories?.map((cat, i) => (
          <NavLink
            onClick={toggleMenu}
            to={decodeURIComponent(cat.slug)}
            key={i}
            className=" hover:brightness-125  rounded-lg md:rounded-none hover:bg-navbarBgColor pl-3 pr-1 py-3 drop-shadow-lg cursor-pointer  text-navTextColor  truncate"
          >
            {cat.name}
          </NavLink>
        ))}
      </li>
    </div>
  );
};

export default DropDown;
