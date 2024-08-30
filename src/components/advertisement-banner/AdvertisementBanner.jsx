import React from "react";
import { useSelector } from "react-redux";
import { IIMAGE_URL } from "../../utils/constants";

const AdvertisementBanner = ({ ads }) => {
  const { specificCategoryAds } = useSelector((state) => state.ads);
  console.log(specificCategoryAds[0]?.image);

  return (
    <div className="   mx-auto flex w-[90%] px-2 sm:px-0">
      <img
        className="mx-auto h-20 w-11/12 max-w-full rounded-sm object-contain lg:h-[120px] lg:w-[1080px] "
        src={`${IIMAGE_URL}/${specificCategoryAds[0]?.image}`}
        // src={ads}
        alt=""
      />
    </div>
  );
};

export default AdvertisementBanner;
