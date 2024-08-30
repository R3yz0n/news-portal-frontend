import { motion } from "framer-motion";
import React from "react";
import { fadeInOut } from "../../animations";

const Dropdown = ({
  categories,
  onChange,
  errors,
  touched,
  value,
  name,
  categoryError,
}) => {
  return (
    <motion.aside className="flex flex-col gap-1 py-1" {...fadeInOut}>
      <label className="text-sm font-semibold uppercase text-gray-700">
        Select category
      </label>
      <select
        className="w-full cursor-pointer rounded-md border border-gray-300 bg-transparent bg-white px-4 py-2 text-base font-medium capitalize text-gray-700 shadow-sm shadow-gray-200 focus:border-blue-600 focus:outline-none"
        onChange={onChange}
        value={value}
        name={name}
      >
        <option hidden>Select a category</option>
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category?.name}
          </option>
        ))}
      </select>
      <div className="ml-2 min-h-[5px] self-start text-sm text-red-600">
        {errors && touched && <motion.div {...fadeInOut}>{errors}</motion.div>}
        {categoryError && (
          <motion.div {...fadeInOut}>{categoryError}</motion.div>
        )}
      </div>
    </motion.aside>
  );
};

export default Dropdown;
