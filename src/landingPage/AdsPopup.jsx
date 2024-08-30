import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IIMAGE_URL } from "../utils/constants";

const AdsPopup = ({ closePopup, popupAds }) => {
  if (!popupAds) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity duration-300">
      <div className="relative max-h-[80%] max-w-[80%] rounded bg-white p-2 opacity-100 shadow-lg transition-opacity duration-300 md:max-w-[50%] ">
        <button
          className=" absolute -right-1 top-0 transition-colors duration-300"
          onClick={closePopup}
        >
          <AiOutlineClose
            className="rounded-md bg-white text-red-600 duration-200 hover:text-red-800"
            size={30}
          />
        </button>
        <img
          src={`${IIMAGE_URL}/${popupAds}`}
          alt="popup ads"
          className="h-full w-full cursor-pointer rounded object-cover transition-opacity duration-300"
          loading="lazy"
          onClick={closePopup}
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform transition-transform duration-300">
          <p className="text-sm text-gray-700">Click anywhere to close</p>
        </div>
      </div>
    </div>
  );
};

export default AdsPopup;
