import React, { useEffect } from "react";
import HamburgerMenu from "./HamburgerMenu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCompany } from "../../../store/company/companyAction";
import { IIMAGE_URL } from "../../../utils/constants";
import { fetchAllHomepageAds } from "../../../store/ads/adsAction"; // New import
import moment from "moment";

const Topbar = ({ isOpen, toggleMenu }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { company } = useSelector((state) => state.company);
  const { topbarAds } = useSelector((state) => state.ads);
  const handleNavigateToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(getCompany()); // Existing dispatch for fetching company data
    dispatch(fetchAllHomepageAds()); // New dispatch for fetching ads data
  }, [dispatch]);

  const ads_image = topbarAds && topbarAds[0] && topbarAds[0].ads_image?.name;

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
    firstName = "Nepathya";
    secondName = "Media";
  }
  const date = moment();
  const formattedDate = date
    .format("D MMM YYYY, dddd")
    .replace(
      /([a-zA-Z]+) (\d{4}),/,
      (_, month, year) => `${month.slice(0, 3)} ${year},`,
    );

  return (
    <main className="z-50 mx-auto flex items-center justify-between gap-2 pl-2 pr-1 md:mb-7 md:max-w-screen-lg lg:max-w-screen-xl ">
      {/* logo and text section */}
      <section className="flex gap-2 md:gap-0 ">
        {image ? (
          <img
            src={`${IIMAGE_URL}/${image}`}
            loading="lazy"
            className="h-16 w-16 cursor-pointer md:h-24 md:w-24 "
            onClick={handleNavigateToHome}
            alt="Logo"
          />
        ) : (
          <figcaption className="h-16 w-16 cursor-pointer rounded-full bg-gray-300 md:h-24 md:w-24"></figcaption>
        )}

        <div className="my-auto  ml-2">
          <h4 className="flex gap-2 text-xl font-semibold  md:text-[2rem]">
            {firstName && (
              <span className="text-logoTextPrimaryColor">{firstName}</span>
            )}
            {secondName && (
              <span className="text-logoTextSecondaryColor">{secondName}</span>
            )}
          </h4>
          <h5 className="">
            <p className="mt-2 h-[4px] w-full  border bg-logoLineColor " />
            <p className="mr-2 text-right text-[13px] font-medium  text-logoTextTernaryColor sm:text-sm">
              {formattedDate}
            </p>
          </h5>
        </div>
      </section>

      <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />

      <section className=" hidden md:block">
        {ads_image && (
          <img
            src={`${IIMAGE_URL}/${ads_image}`}
            className="self-right md:max-h-[80px] md:max-w-[650px]  lg:max-h-[96px]  lg:max-w-[500px] "
            alt="AdBanner"
          />
        )}
      </section>
    </main>
  );
};

export default Topbar;
