import React from "react";
import { FaMoneyBillWave } from "react-icons/fa6";
import { fadeInOut } from "../../../animations";
import { motion } from "framer-motion";

const AdvertisementSummary = ({
  month,
  discount,
  advertisement,
  advertisements,
  start_date,
  paid_amount,
}) => {
  function findAdvertisementRate(id) {
    const selectedAdvertisement = advertisements.find(
      (ads) => ads.id === parseInt(id),
    );
    return selectedAdvertisement ? selectedAdvertisement.rate : null;
  }
  return (
    <motion.aside
      className="  h-fit rounded-md bg-white px-6 py-3 shadow-md"
      {...fadeInOut}
    >
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Advertisement Summary
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center justify-center border-r border-gray-300 pr-4">
          <p className="mb-2 text-sm font-semibold text-gray-600">
            Rate x month
          </p>
          <div className="flex items-center">
            <p className="text-lg font-bold text-blue-500">
              Rs.
              {findAdvertisementRate(advertisement)} x {month}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pl-4">
          <p className="mb-2 text-sm font-semibold text-gray-600">
            Discount Amount
          </p>
          <div className="flex items-center">
            <p className="text-lg font-bold text-green-500">
              Rs. {start_date && discount}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pl-4">
          <p className="mb-2 text-sm font-semibold text-gray-600">
            Total Amount
          </p>
          <div className="flex items-center">
            <p className="flex items-center text-lg font-bold text-green-500">
              <FaMoneyBillWave className="mr-2 text-green-500" />
              Rs.{" "}
              {start_date &&
                findAdvertisementRate(advertisement) &&
                parseInt(findAdvertisementRate(advertisement)) *
                  parseInt(month) -
                  parseInt(discount || 0)}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pl-4">
          <p className="mb-2 text-sm font-semibold text-gray-600">
            Remaining Amount
          </p>
          <div className="flex items-center">
            <FaMoneyBillWave className="mr-2 text-red-500" />
            <p className="text-lg font-bold text-red-500">
              Rs.{" "}
              {start_date &&
                (findAdvertisementRate(advertisement) &&
                  parseInt(findAdvertisementRate(advertisement)) *
                    parseInt(month) -
                    parseInt(discount || 0)) - parseInt(paid_amount || 0)}
            </p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default AdvertisementSummary;
