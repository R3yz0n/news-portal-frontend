import React, { useEffect } from "react";
import { fadeInOut } from "../../../animations";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { clearFields } from "../../../store/advertisement/advertisementSlice";

const TransactionsTable = () => {
  const tableColumns = [
    { field: "clientName", label: "Client" },
    { field: "amount", label: "Amount" },
    { field: "paid", label: "Paid" },
    { field: "dues", label: "Dues" },
    { field: "status", label: "Status" },
  ];

  const dispatch = useDispatch();
  const { loading, error, transactions } = useSelector(
    (state) => state.transaction,
  );

  useEffect(() => {
    dispatch(clearFields());
  }, [dispatch]);

  const calculateDues = (total, paidAmount) => {
    return total - paidAmount;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead className="bg-[rgb(218,221,228)] font-sans text-[17px] text-gray-800 shadow-md">
          <tr>
            {tableColumns.map((column, index) => (
              <th key={index} className="px-6 py-3 text-left">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {loading ? (
            <motion.tr {...fadeInOut} className="flex w-full p-2 text-lg">
              <td>Loading...</td>
            </motion.tr>
          ) : transactions?.clientData?.length > 0 ? (
            transactions?.clientData?.map((client, index) => (
              <tr
                key={client.id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="whitespace-nowrap px-6 py-4">{client?.name}</td>
                <td className="whitespace-nowrap px-6 py-4">{client?.total}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {client?.paid_amount}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {calculateDues(client?.total, client?.paid_amount)}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {client?.paid_amount === client?.total ? (
                    <span className="text-green-600">Paid</span>
                  ) : (
                    <span className="text-red-600">Unpaid</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <motion.tr
              {...fadeInOut}
              className="flex w-full p-8 text-center text-lg"
            >
              <td>{error?.length > 0 ? error : "No Transactions Found."}</td>
            </motion.tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
