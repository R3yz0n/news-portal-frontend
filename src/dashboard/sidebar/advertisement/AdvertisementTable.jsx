import React, { useEffect } from "react";
import { fadeInOut } from "../../../animations";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAdvertisement } from "../../../store/advertisement/advertisementAction";
import { clearFields } from "../../../store/advertisement/advertisementSlice";
import { FaEdit } from "react-icons/fa";

const AdvertisementTable = () => {
  const advertisementColumns = [
    { field: "type", label: "Advertisement Type" },
    { field: "Rate", label: "Rate" },
    { field: "icon", label: "Action", isIcon: true },
  ];
  const dispatch = useDispatch();
  const { advertisements, loading, error } = useSelector(
    (state) => state.advertisement,
  );

  useEffect(() => {
    dispatch(clearFields());
    dispatch(fetchAllAdvertisement());
  }, [dispatch]);

  return (
    <div className="min-h-[450px]">
      <table className="static min-w-full">
        <thead className="  bg-[rgb(218,221,228)] font-sans text-[17px] text-gray-800 shadow-md ">
          <tr>
            {advertisementColumns.map((column, index) => (
              <th key={index} className="px-6 py-3 text-left">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`scrollbar-track-black  overflow-y-scroll `}>
          {loading ? (
            <motion.tr
              {...fadeInOut}
              className="flex w-full p-2 text-lg text-red-700"
            >
              <td>Loading...</td>
            </motion.tr>
          ) : advertisements?.length > 0 ? (
            advertisements.map((advertisement, index) => (
              <tr
                key={advertisement?.id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="whitespace-nowrap px-6 py-4">
                  {advertisement?.type}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  Rs. {advertisement?.rate}
                </td>

                <td className="flex h-11 gap-5 pl-8">
                  <Link to={`${advertisement.id}`}>
                    <FaEdit className="mt-3 cursor-pointer text-xl duration-300 hover:scale-125 hover:text-gray-700 " />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <motion.tr
              {...fadeInOut}
              className="flex w-full p-2 text-lg text-red-700"
            >
              <td>{error?.length > 0 ? error : "No Advertisments Found."}</td>
            </motion.tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdvertisementTable;
