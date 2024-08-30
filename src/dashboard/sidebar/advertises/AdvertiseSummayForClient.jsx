import React from "react";
import { FaMoneyBillWave } from "react-icons/fa6";

const AdvertiseSummayForClient = ({ advertisesByClient }) => {
  return (
    <aside className=" mt-8 w-full rounded-md bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Advertises Summary Of:{" "}
        <span className="capitalize text-blue-500">
          {" "}
          {advertisesByClient?.name}
        </span>
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center justify-center border-r border-gray-300 pr-4">
          <p className="mb-2 text-sm font-semibold text-gray-600">
            Total Amount
          </p>
          <div className="flex items-center">
            <FaMoneyBillWave className="mr-2 text-green-500" />
            <p className="text-lg font-bold text-green-500">
              {advertisesByClient?.total_amount}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pl-4">
          <p className="mb-2 text-sm font-semibold text-gray-600">
            Payable Amount
          </p>
          <div className="flex items-center">
            <FaMoneyBillWave className="mr-2 text-red-500" />
            <p className="text-lg font-bold text-red-500">
              {advertisesByClient?.payable_amount}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pl-4">
          <p className="mb-2 text-sm font-semibold text-gray-600">
            Paid Amount
          </p>
          <div className="flex items-center">
            <FaMoneyBillWave className="mr-2 text-blue-500" />
            <p className="text-lg font-bold text-blue-500">
              {(advertisesByClient?.total_amount || 0) -
                (advertisesByClient?.payable_amount || 0)}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdvertiseSummayForClient;
