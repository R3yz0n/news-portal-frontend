import { motion } from "framer-motion";
import React, { useState } from "react";

const FormInput = ({
  label,
  onBlur,
  onChange,
  type,
  value,
  name,
  errors,
  touched,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const handleBlur = (event) => {
    setIsFocus(false);
    onBlur(event);
  };

  return (
    <>
      <motion.div
        className={`flex flex-col  w-full h-24   ${isFocus && ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <label className="w-full font-Mukta font-medium text-lg">{label}</label>

        <input
          autoComplete="true"
          type={type}
          value={value}
          onChange={onChange}
          name={name}
          onBlur={handleBlur}
          onFocus={() => setIsFocus(true)}
          className="bg-transparent border-gray-400 px-2.5 py-1.5  outline-none focus:border-red-500 rounded-md border"
        />
      </motion.div>

      <div className="-mt-5 mb-3  text-sm  text-red-600 self-start ml-1">
        {errors && touched && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {errors}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default FormInput;
