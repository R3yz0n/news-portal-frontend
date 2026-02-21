import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fadeInOut, fadeInOutHalf } from "../../../animations";

import { fetchAllClients } from "../../../store/client/clientAction";
import { FaEdit } from "react-icons/fa";

const ClientTable = ({ page, searchKeyword }) => {
  const { clients, error, loading } = useSelector((state) => state.client);

  const dispatch = useDispatch();

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchKeyword.length > 0)
        dispatch(
          fetchAllClients({ page: page, size: 10, filter: searchKeyword }),
        );
    }, 1000);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [dispatch, page, searchKeyword]);

  useEffect(() => {
    if (searchKeyword.length === 0)
      dispatch(
        fetchAllClients({ page: page, size: 10, filter: searchKeyword }),
      );
  }, [dispatch, page, searchKeyword]);
  return (
    <div className="min-w-full">
      <table className="static min-w-full ">
        {!loading && (
          <motion.thead
            {...fadeInOutHalf}
            className="  sticky top-0 bg-[rgb(218,221,228)] font-sans text-base  text-gray-800 shadow-md "
          >
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Address</th>
              <th className="px-6 py-3 text-left">Phone Number</th>
              <th className="pr-1 text-left">Action</th>
            </tr>
          </motion.thead>
        )}
        <tbody className={`overflow-y-scroll`}>
          {loading ? (
            <motion.tr {...fadeInOut} className="flex w-full p-2 text-lg">
              <td>Loading...</td>
            </motion.tr>
          ) : clients?.length > 0 && error === null ? (
            clients.map((client, index) => (
              <motion.tr
                {...fadeInOutHalf}
                key={client?.id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className=" whitespace-nowrap px-6 py-4">{client?.name}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {client?.address}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {client?.phone_no}
                </td>
                <td className="flex h-11 gap-5 pl-8">
                  <Link to={`${client?.id}`}>
                    <FaEdit className="mt-3 cursor-pointer text-xl duration-300 hover:scale-125 hover:text-gray-700 " />
                  </Link>
                </td>
              </motion.tr>
            ))
          ) : (
            <motion.tr {...fadeInOut} className="flex w-full p-2 text-lg">
              <td>{error?.length > 0 ? error : "No Clients Found."}</td>
            </motion.tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
