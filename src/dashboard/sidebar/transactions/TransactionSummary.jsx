import React from "react";
import { FaListAlt, FaMoneyBillWave } from "react-icons/fa";

const TransactionSummary = ({
  selectedClient,
  totalTransactions,
  totalAmount,
  totalAmountPaid,
  totalRemainingAmount,
}) => {
  return (
    <div className="mt-8 rounded-md bg-white p-6 shadow-md">
      <h2 className="mb-4 text-center text-lg font-semibold text-gray-800">
        Transaction Summary: {selectedClient}
      </h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col items-center justify-center border-r border-gray-300 pr-4">
          <p className="mb-2 text-sm font-semibold text-gray-600">
            Total Transactions:
          </p>
          <div className="flex items-center">
            <FaListAlt className="mr-2 text-blue-500" />
            <p className="text-lg font-bold text-blue-500">
              {totalTransactions || 0}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pl-4">
          <p className="mb-2 text-sm font-semibold text-gray-600">
            Total Amount :
          </p>
          <div className="flex items-center">
            <FaMoneyBillWave className="mr-2 text-green-500" />
            <p className="text-lg font-bold text-green-500">
              {totalAmount || 0}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-r border-gray-300 pr-4">
          <p className="mb-2 text-sm font-semibold text-gray-600">
            Total Amount Paid:
          </p>
          <div className="flex items-center">
            <FaMoneyBillWave className="mr-2 text-blue-500" />
            <p className="text-lg font-bold text-blue-500">
              {totalAmountPaid || 0}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pl-4">
          <p className="mb-2 text-sm font-semibold text-gray-600">
            Payable Amount:
          </p>
          <div className="flex items-center">
            <FaMoneyBillWave className="mr-2 text-red-500" />
            <p className="text-lg font-bold text-red-500">
              {totalRemainingAmount || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSummary;
