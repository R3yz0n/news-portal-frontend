import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const SocialLinksInput = ({ errors, touched, socialLinks, addSocialLinks }) => {
  const [inputFields, setInputFields] = useState(socialLinks);

  useEffect(() => {
    setInputFields(socialLinks);
  }, [socialLinks]);

  const handleInputChange = (index, value, field) => {
    const newFields = [...inputFields];
    newFields[index] = {
      ...newFields[index],
      [field]: value,
    };
    setInputFields(newFields);
    addSocialLinks(newFields);
    // console.log(inputFields);
  };

  const handleAddField = (event) => {
    event.preventDefault();
    const newFields = [...inputFields, { name: "", social_media_link: "" }];
    setInputFields(newFields);
    addSocialLinks(newFields);
  };

  const handleRemoveField = (index) => {
    const newFields = [...inputFields];
    newFields.splice(index, 1);
    setInputFields(newFields);
    addSocialLinks(newFields);
  };
  return (
    <motion.div className="w-full flex-col py-1 ">
      <label className="mb-2 flex items-center text-sm font-semibold uppercase text-gray-700">
        Social links
        <button
          type="button"
          className="ml-8 flex h-auto items-center rounded-md bg-gray-300 px-2 py-0.5 text-sm font-semibold text-gray-700"
          onClick={handleAddField}
        >
          Add
          <FaPlus className="ml-2 text-sm" />
        </button>
      </label>
      <div className="flex flex-col gap-2">
        {inputFields?.map((inputField, index) => (
          <div key={index} className="flex gap-3">
            <input
              type="text"
              placeholder="name"
              className="w-full rounded-md border border-gray-400 bg-transparent bg-white px-4 py-1.5 text-base font-medium text-gray-800 shadow-sm shadow-gray-200 focus:border-red-700 focus:outline-none"
              value={inputField?.name}
              onChange={(e) => handleInputChange(index, e.target.value, "name")}
            />
            <input
              type="text"
              placeholder="social_media_link"
              className="w-full rounded-md border border-gray-400 bg-transparent bg-white px-4 py-1.5 text-base font-medium text-gray-800 shadow-sm shadow-gray-200 focus:border-red-600 focus:outline-none"
              value={inputField?.social_media_link}
              onChange={(e) =>
                handleInputChange(index, e.target.value, "social_media_link")
              }
            />
            <button
              type="button"
              className="text-2xl font-semibold"
              onClick={() => handleRemoveField(index)}
            >
              <FaMinus className="w-10 text-base" />
            </button>
          </div>
        ))}
      </div>

      <div className="ml-2 mt-0.5 min-h-[24px] self-start text-sm text-red-600">
        {errors && !inputFields[0]?.name && (
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

export default SocialLinksInput;
