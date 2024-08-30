import React, { useEffect } from "react";
import { fadeInOut } from "../../../animations";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { clearFields } from "../../../store/advertisement/advertisementSlice";
import { date } from "yup";

const ClientTransactionsTable = () => {
  const tableColumns = [
    // { field: "clientName", label: "Client" },
    { field: "date", label: "Date" },
    { field: "paid", label: "Paid Amount" },
  ];

  const dispatch = useDispatch();
  const { loading, error, transactions } = useSelector(
    (state) => state.transaction,
  );

  useEffect(() => {
    dispatch(clearFields());
  }, [dispatch]);

  const formatDate = (date) => {
    return date.split("T")[0];
  };

  return (
    <div className="   h-[40vh] overflow-x-auto">
      <table className="w-full table-auto">
        <thead className="sticky top-0 bg-[rgb(218,221,228)] font-sans text-[17px] text-gray-800 shadow-md">
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
            <motion.tr
              {...fadeInOut}
              className="flex w-full p-2 text-lg text-red-700"
            >
              <td>Loading...</td>
            </motion.tr>
          ) : transactions?.transactionData?.length > 0 ? (
            transactions?.transactionData?.map((client, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="whitespace-nowrap px-6 py-4">
                  {formatDate(client?.created_at)}
                </td>

                <td className="whitespace-nowrap px-6 py-4">{client?.paid}</td>
              </tr>
            ))
          ) : (
            <motion.tr
              {...fadeInOut}
              className="flex w-full p-8 text-center text-lg text-red-700"
            >
              <td>{error?.length > 0 ? error : "No Transactions Found."}</td>
            </motion.tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTransactionsTable;
