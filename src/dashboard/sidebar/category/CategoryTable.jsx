import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInOut } from "../../../animations";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../../../store/category/categoryAction";
import { FaEdit } from "react-icons/fa";

const CategoryTable = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <table className="  min-w-full ">
      <thead className="  sticky top-0 bg-[rgb(218,221,228)] font-sans text-[17px]  text-gray-800 shadow-md">
        <tr>
          <th className="px-6 py-3 text-left">Categories</th>
          <th className="px-6 py-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody className={`scrollbar-track-black  overflow-y-scroll `}>
        {loading ? (
          <motion.tr {...fadeInOut} className="flex w-full p-2 text-lg">
            <td>Loading...</td>
          </motion.tr>
        ) : categories?.length > 0 ? (
          categories.map((category, index) => (
            <tr
              key={category?.id}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="whitespace-nowrap px-6 py-4">{category?.name}</td>

              <td className="flex h-11 gap-5 pl-8">
                <Link to={`${category.id}`}>
                  <FaEdit className="mt-3 cursor-pointer text-xl duration-300 hover:scale-125 hover:text-gray-700 " />
                </Link>
              </td>
            </tr>
          ))
        ) : (
          <motion.tr {...fadeInOut} className="flex w-full p-2 text-lg">
            <td>{error?.length > 0 ? error : "No Categories Found."}</td>
          </motion.tr>
        )}
      </tbody>
    </table>
  );
};

export default CategoryTable;
