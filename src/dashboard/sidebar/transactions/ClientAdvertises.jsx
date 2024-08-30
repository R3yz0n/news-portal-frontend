import React, { useEffect } from "react";
import { fadeInOut } from "../../../animations";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { clearFields } from "../../../store/advertisement/advertisementSlice";
import { fetchAllAdvertisesOfClient } from "../../../store/advertises/advertisesAction";

const ClientAdvertisesTable = () => {
  const tableColumns = [
    // { field: "clientName", label: "Client" },
    // { field: "date", label: "Date" },
    // { field: "paid", label: "Paid Amount" },
    { field: "ads-name", label: "Ads Name" },
    { field: "ads-price", label: "Total Price" },
    { field: "ads-status", label: " Status" },
  ];

  const { advertisesByClient, error, loading } = useSelector(
    (state) => state.advertises,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearFields());
    };
  }, [dispatch]);

  return (
    <div className="h-[40vh] overflow-x-auto">
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
          ) : advertisesByClient?.advertisement?.length > 0 ? (
            advertisesByClient?.advertisement?.map((client, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="whitespace-nowrap px-6 py-4">{client?.name}</td>

                <td className="whitespace-nowrap px-6 py-4">
                  {client?.total_price}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {client?.status === true ? (
                    <p className="text-green-500">Active</p>
                  ) : (
                    <p className="text-red-500">Not Active</p>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <motion.tr
              {...fadeInOut}
              className="flex w-full p-8 text-center text-lg text-red-700"
            >
              <td>{error?.length > 0 ? error : "No Ads Found."}</td>
            </motion.tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientAdvertisesTable;
