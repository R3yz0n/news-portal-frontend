import { motion } from "framer-motion";
import React, { useState } from "react";

const GenderInput = ({ errors, touched, selectedGender, setGenderInput }) => {
  const handleGenderChange = (gender) => {
    setGenderInput(gender);
  };

  return (
    <motion.div className='flex-col w-full py-1'>
      <label className='flex items-center mb-2 text-sm font-semibold text-gray-700 uppercase'>
        Gender
      </label>
      <div className='flex gap-3'>
        <div className='flex items-center gap-2'>
          <input
            type='radio'
            id='male'
            name='gender'
            value='male'
            checked={selectedGender === "male"}
            onChange={() => handleGenderChange("male")}
            key='male'
          />
          <label htmlFor='male'>Male</label>
        </div>
        <div className='flex items-center gap-2'>
          <input
            type='radio'
            id='female'
            name='gender'
            value='female'
            checked={selectedGender === "female"}
            onChange={() => handleGenderChange("female")}
            key='female'
          />
          <label htmlFor='female'>Female</label>
        </div>
        <div className='flex items-center gap-2'>
          <input
            type='radio'
            id='others'
            name='gender'
            value='others'
            checked={selectedGender === "others"}
            onChange={() => handleGenderChange("others")}
            key='others'
          />
          <label htmlFor='others'>Others</label>
        </div>
      </div>

      <div className='min-h-[24px] mt-0.5 text-red-600 self-start ml-2 text-sm'>
        {errors && (
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
    </motion.div>
  );
};

export default GenderInput;
