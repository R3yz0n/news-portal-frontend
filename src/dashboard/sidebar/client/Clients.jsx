import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLoader from "../../../animations/MainLoader";
import User from "./User";
import { getAllUsers } from "../../../store/user/userAction";
import { clearFields } from "../../../store/user/userSlice";
import { fadeInOut } from "../../../animations";
import { motion } from "framer-motion";

const Users = () => {
  const dispatch = useDispatch();
  const { searchValue } = useSelector((state) => state.search);
  const { usersList, loading } = useSelector((state) => state.user);

  useEffect(() => {
    // console.log(searchValue);
    if (searchValue) {
      const id = setTimeout(() => {
        // const search = { searchValue: searchValue }
        dispatch(getAllUsers(searchValue)).then((res) =>
          dispatch(clearFields()),
        );
      }, [1000]);

      return () => {
        clearTimeout(id);
      };
    } else {
      dispatch(getAllUsers("all")).then(() => {
        dispatch(clearFields());
      });
    }
  }, [dispatch, searchValue]);

  return (
    <>
      <div className="   scrollbar-thin relative mt-10 max-h-[80vh] overflow-y-auto rounded-lg shadow-lg">
        {loading && <MainLoader />}

        <table className="static min-w-full">
          <thead className="  bg-[rgb(218,221,228)] font-sans text-[17px] text-gray-800 shadow-md">
            <tr>
              <th className="px-6 py-3 text-left">Full Name</th>
              <th className="px-6 py-3 text-left">Email Address</th>
              <th className="px-6 py-3 text-left">Phone Number</th>
              <th className="px-6 py-3 text-left">Address</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="scrollbar-track-black max-h-[60vh] overflow-y-scroll  ">
            {usersList?.length > 0 ? (
              usersList.map((user, index) => (
                <User user={user} index={index} key={user.id} />
              ))
            ) : (
              <motion.tr
                {...fadeInOut}
                className="flex w-full p-2 text-lg text-red-700"
              >
                <td className="">{!loading && "No User Found."}</td>
              </motion.tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
