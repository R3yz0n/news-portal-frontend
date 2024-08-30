import { motion } from "framer-motion";
import React from "react";
import { fadeInOut } from "../../../animations";
import { OtherFormError } from "../../common/FormInput";

const MonthSelectionDropDown = ({ months, onChange, errors, value, name }) => {
  return (
    <motion.aside className="flex w-full flex-col gap-1 py-1" {...fadeInOut}>
      <label className="text-sm font-semibold uppercase text-gray-700">
        Select Duration
      </label>
      <select
        className="w-full cursor-pointer rounded-md border border-gray-300 bg-transparent bg-white px-4 py-2 text-base font-medium capitalize text-gray-700 shadow-sm shadow-gray-200 focus:border-blue-600 focus:outline-none"
        onChange={onChange}
        value={value}
        name={name}
      >
        {months?.map((month) => (
          <option key={month.id} value={month.id}>
            {month.month} month
          </option>
        ))}
      </select>
      <div className="ml-2 min-h-[5px] self-start text-sm text-red-600">
        {errors && <motion.div {...fadeInOut}>{errors}</motion.div>}
      </div>
    </motion.aside>
  );
};

export default MonthSelectionDropDown;
