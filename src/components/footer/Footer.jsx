import { motion } from "framer-motion";
import React from "react";
import { fadeInOut } from "../../animations";
import { useSelector } from "react-redux";
import moment from "moment";
import { IIMAGE_URL } from "../../utils/constants";
import SocialMedia from "./SocialMedia";

const Footer = () => {
  const { company } = useSelector((state) => state.company);
  const image = company?.fileupload?.name;
  const companyName = company?.name
    ?.split(/\s+/)
    .filter((part) => part.trim() !== "");
  let firstName;
  let secondName;
  if (companyName) {
    firstName = companyName[0];
    secondName = companyName[1];
  } else {
    firstName = "Media";
    secondName = "Company";
  }

  const date = moment();
  const formattedDate = date
    .format("D MMM YYYY, dddd")
    .replace(
      /([a-zA-Z]+) (\d{4}),/,
      (_, month, year) => `${month.slice(0, 3)} ${year},`,
    );
  return (
    <motion.footer
      {...fadeInOut}
      className=" mt-14 h-full w-full overflow-clip bg-navbarBgColor pb-4  pt-8 sm:pt-16"
    >
      <section className="mx-auto grid w-fit  grid-cols-2 flex-col items-start justify-evenly  gap-10 px-4 sm:ml-0 sm:w-full sm:flex-row md:flex  md:px-0 ">
        <section className="flex   h-fit items-center  gap-0 sm:mx-auto sm:gap-2 md:m-0 md:flex-col  md:gap-5  lg:flex lg:flex-row">
          {image ? (
            <img
              src={`${IIMAGE_URL}/${image}`}
              loading="lazy"
              className="h-16 w-16 cursor-pointer md:h-24 md:w-24"
              alt="Logo"
            />
          ) : (
            <figcaption className="h-16 w-16 cursor-pointer rounded-full bg-gray-300 md:h-24 md:w-24"></figcaption>
          )}

          <div className="ml-2  ">
            <h4 className="mb-2 flex  gap-2 font-Poppins text-lg  font-semibold sm:text-xl lg:text-[2rem]">
              {firstName && (
                <span className="text-logoTextPrimaryColor">{firstName}</span>
              )}
              {secondName && (
                <span className="text-logoTextSecondaryColor">
                  {secondName}
                </span>
              )}
            </h4>
            <h5 className="mt-1">
              <p className="border border-logoTextPrimaryColor  " />
              <p className="mr-2 mt-1 w-max text-[13px]  font-medium text-white sm:text-right sm:text-sm">
                {formattedDate}
              </p>
            </h5>
          </div>
        </section>

        <aside className="order-4 w-48 text-[13px] sm:order-4 sm:text-[15px] md:w-auto  lg:order-none">
          <h6 className="mb-2 text-sm font-semibold text-gray-100 sm:mb-4 sm:text-lg">
            For more information
          </h6>
          <p className="mb-3 cursor-pointer text-gray-300 transition-all duration-500 hover:underline sm:mb-0">
            Chairman/ Executive Editor : {company?.sanchalak}
          </p>
          <p className="cursor-pointer text-gray-300 transition-all duration-700 hover:underline">
            Editor in Chief : {company?.pradhan_sanchalak}
          </p>
        </aside>

        <aside className="order-3 text-[13px]  sm:mx-auto sm:text-[15px] md:order-none md:m-0">
          <h6 className="mb-2 text-sm font-semibold text-gray-100 sm:mb-4 sm:text-lg">
            Contact Information
          </h6>
          <p className="text-gray-300 transition-all duration-500 hover:underline">
            {company?.name}
          </p>
          <p className="text-gray-300 transition-all duration-500 hover:underline">
            Butwal-10, Rupandehi
          </p>
          <p className="mt-5 text-gray-300 transition-all duration-500 hover:underline">
            {company?.email}
          </p>
          <p className="text-gray-300 transition-all duration-500 hover:underline">
            {company?.phone_no}
          </p>
        </aside>

        <aside className="order-2 text-[13px]  sm:order-2 sm:text-[15px]">
          <h6 className="mb-2 text-sm font-semibold text-gray-100 sm:mb-4 sm:text-lg">
            Social Media
          </h6>
          <p className="grid  grid-cols-3 gap-3 px-2 text-2xl text-gray-300 md:px-0  ">
            {company?.social_media?.slice(0, 6).map((socialMedia) => (
              <SocialMedia socialMedia={socialMedia} key={socialMedia.id} />
            ))}
          </p>
        </aside>
      </section>

      <section className="mt-10 flex flex-col gap-5 px-5  sm:mt-20">
        <hr />
        <div className="flex justify-around gap-28 text-xs text-gray-200 sm:gap-48 ">
          <span>© 2023 {company?.name} All rights reserved.</span>
          <span>Site by: Bootwal R&D</span>
        </div>
      </section>
    </motion.footer>
  );
};

export default Footer;
