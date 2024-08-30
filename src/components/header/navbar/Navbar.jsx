import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import DropDown from "./DropDown";
import { motion } from "framer-motion";
import { getCompany } from "../../../store/company/companyAction";
import { IIMAGE_URL } from "../../../utils/constants";

const Navbar = ({ isOpen, toggleMenu }) => {
  const location = useLocation();
  const [overflow, setOverflow] = useState(true);
  const { categories, error } = useSelector((state) => state.category);
  const [sliceValue, setSliceValue] = useState(9);
  const remainingCategories = categories?.slice(sliceValue);
  const [isFixed, setIsFixed] = useState(false);

  const toggleDropdown = () => {
    setOverflow(false);
  };
  useEffect(() => {
    const handleResize = () => {
      setSliceValue(window.innerWidth < 1200 ? 6 : 8);
    };

    const handleScroll = () => {
      const scrollHeight = 100;

      if (window.scrollY > scrollHeight) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { company } = useSelector((state) => state.company);
  const handleNavigateToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  const image = company?.fileupload?.name;

  const companyName = company?.name
    ?.split(/\s+/)
    ?.filter((part) => part.trim() !== "");

  let firstName;
  let secondName;
  if (companyName) {
    firstName = companyName[0];
    secondName = companyName[1];
  } else {
    firstName = "खुराक";
    secondName = "मिडिया";
  }

  return (
    <motion.nav
      className={`z-50  mx-auto mt-4  bg-navbarBgColor text-navTextColor md:mt-0 md:block xl:px-1  ${
        overflow && "overflow-hidden"
      } ${
        isFixed
          ? "ease-in-out   top-0 w-full  backdrop-blur transition-all duration-200 md:fixed  md:bg-opacity-90"
          : "top-4 xl:w-[1280px]   xl:rounded-md "
      }`}
    >
      <div
        className={` flex  scale-y-100    flex-col items-center justify-around px-4 opacity-100 duration-500  md:flex-row ${
          isOpen
            ? "h-[480px] scale-y-100 py-3  opacity-100 md:h-auto md:py-0"
            : "h-0 scale-y-0 overflow-hidden p-0 opacity-0 md:h-auto md:overflow-visible"
        }`}
      >
        <section className={`${isFixed ? "block  " : "hidden"}  `}>
          {companyName ? (
            // <img
            //   src={`${IIMAGE_URL}/${image}`}
            //   loading="lazy"
            //   className="h-16 w-16 cursor-pointer p-1 md:h-20 md:w-20"
            //   onClick={handleNavigateToHome}
            //   alt="logo"
            // />
            <h4 className="flex gap-2 text-xl font-semibold  md:text-2xl">
              {firstName && (
                <span className="text-logoTextPrimaryColor">{firstName}</span>
              )}
              {secondName && (
                <span className="text-logoTextSecondaryColor">
                  {secondName}
                </span>
              )}
            </h4>
          ) : (
            <figcaption className="h-16 w-16 cursor-pointer rounded-full bg-gray-300 md:h-24 md:w-24"></figcaption>
          )}
        </section>
        <NavLink
          onClick={toggleMenu}
          to="/"
          className={`z-[-50!important] cursor-pointer rounded-lg px-4 py-2 text-navTextColor drop-shadow-lg  hover:bg-navbarBgColor hover:brightness-125 md:rounded-none md:py-4 md:font-semibold lg:text-[18px]    ${
            `/` === decodeURIComponent(location.pathname) ? "bg-red-600" : ""
          }`}
        >
          गृहपृष्ठ
        </NavLink>
        {categories?.slice(0, sliceValue).map((cat, i) => (
          <NavLink
            onClick={toggleMenu}
            to={decodeURIComponent(cat?.slug)}
            key={i}
            className={`-z-50  cursor-pointer rounded-lg px-4 py-2 text-navTextColor drop-shadow-lg hover:bg-navbarBgColor hover:brightness-125 md:rounded-none md:py-4 md:font-semibold lg:text-[18px]  ${
              `/${cat.name}` === decodeURIComponent(location.pathname)
                ? "bg-red-600 "
                : ""
            }`}
          >
            {cat.name}
          </NavLink>
        ))}
        {error && (
          <NavLink className="md:self-center">
            Error fetching categories
          </NavLink>
        )}

        <DropDown
          toggleDropdown={toggleDropdown}
          remainingCategories={remainingCategories}
          toggleMenu={toggleMenu}
        />
      </div>
    </motion.nav>
  );
};

export default Navbar;
