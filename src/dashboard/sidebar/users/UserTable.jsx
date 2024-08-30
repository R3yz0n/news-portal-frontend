import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fadeInOut, fadeInOutHalf } from "../../../animations";

import { FaEdit } from "react-icons/fa";
import { fetchAllUsers } from "../../../store/user/userAction";

const ClientTable = ({ page, searchKeyword }) => {
  const dispatch = useDispatch();
  const { users, error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchKeyword.length > 0)
        dispatch(
          fetchAllUsers({ page: page, size: 10, filter: searchKeyword }),
        );
    }, 1000);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [dispatch, page, searchKeyword]);

  useEffect(() => {
    if (searchKeyword.length === 0)
      dispatch(fetchAllUsers({ page: page, size: 10, filter: searchKeyword }));
  }, [dispatch, page, searchKeyword]);

  return (
    <div className="min-w-full">
      <table className="static min-w-full">
        {!loading && (
          <motion.thead
            {...fadeInOutHalf}
            className="  sticky top-0 bg-[rgb(218,221,228)] font-sans text-base  text-gray-800 shadow-md "
          >
            <tr>
              <th className="px-6 py-3 text-left">Full Name</th>
              <th className="px-6 py-3 text-left">Username / Email</th>
              <th className="px-6 py-3 text-left">Phone Number</th>
              <th className="px-6 py-3 text-left">Address</th>
              <th className="pr-1 text-left">Action</th>
            </tr>
          </motion.thead>
        )}
        <tbody className={`scrollbar-track-black overflow-y-scroll`}>
          {loading ? (
            <motion.tr
              {...fadeInOutHalf}
              className="flex w-full p-2 text-lg text-red-700"
            >
              <td>Loading...</td>
            </motion.tr>
          ) : users?.length > 0 && error === null ? (
            users.map((user, index) => (
              <motion.tr
                {...fadeInOutHalf}
                key={user?.id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="whitespace-nowrap px-6 py-4">
                  {user?.fullname}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {user?.username}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {user?.phone_no}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{user?.address}</td>

                <td className="flex h-11 gap-5 pl-8">
                  <Link to={`${user?.id}`}>
                    <FaEdit className="mt-3 cursor-pointer text-xl duration-300 hover:scale-125 hover:text-gray-700 " />
                  </Link>
                </td>
              </motion.tr>
            ))
          ) : (
            <motion.tr
              {...fadeInOut}
              className="flex w-full p-2 text-lg text-red-700"
            >
              <td>{error?.length > 0 ? error : "No Users Found."}</td>
            </motion.tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
