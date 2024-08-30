import React from "react";
import { FaListAlt, FaMoneyBillWave } from "react-icons/fa";

const AddTransactionSummary = ({
  selectedClient,
  totalTransactions,
  totalAmountPayable,
}) => {
  return (
    <div className="mt-8 rounded-md bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Transaction Summary : {selectedClient}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center justify-center border-r border-gray-300 pr-4">
          <p className="mb-2 text-sm font-semibold text-gray-600">
            Paid Amount:
          </p>
          <div className="flex items-center">
            <FaListAlt className="mr-2 text-blue-500" />
            <p className="text-lg font-bold text-blue-500">
              {totalTransactions}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pl-4">
          <p className="mb-2 text-sm font-semibold text-gray-600">
            Payable Amount:
          </p>
          <div className="flex items-center">
            <FaMoneyBillWave className="mr-2 text-green-500" />
            <p className="text-lg font-bold text-green-500">
              {totalAmountPayable}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionSummary;
