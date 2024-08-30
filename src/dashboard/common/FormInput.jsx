import { motion } from "framer-motion";
import React, { useState } from "react";
import { fadeInOut } from "../../animations";

const FormInput = ({
  onBlur,
  onChange,
  type,
  value,
  name,
  errors,
  touched,
  title,
  rows,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const handleBlur = (event) => {
    setIsFocus(false);
    onBlur(event);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    if (type === "number" && inputValue.length <= 10) {
      onChange(event);
    }
    return;
  };

  return (
    <>
      <motion.div className="max-w-1/2 w-full flex-col py-1 " {...fadeInOut}>
        <label
          htmlFor=""
          className="text-sm font-semibold uppercase text-gray-700"
        >
          {title}
        </label>
        {type === "textarea" ? (
          <textarea
            className="w-full rounded-md border border-gray-300 bg-transparent bg-white px-4   py-1.5 text-base font-medium  text-gray-800 shadow-sm  shadow-gray-200 focus:border-blue-600 focus:outline-none "
            // type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            onFocus={() => setIsFocus(true)}
            rows={rows || 8}
          ></textarea>
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => {
              if (type === "number") {
                handleInputChange(e);
                return;
              }
              onChange(e);
            }}
            name={name}
            onBlur={handleBlur}
            onFocus={() => setIsFocus(true)}
            className="w-full rounded-md border border-gray-300 bg-transparent bg-white px-4   py-1.5 text-base font-medium  text-gray-700 shadow-sm  shadow-gray-200 focus:border-blue-600 focus:outline-none"
          />
        )}
        <div className="ml-2 min-h-[5px] self-start text-sm text-red-600">
          {errors && touched && (
            <motion.div {...fadeInOut}>{errors}</motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default FormInput;
