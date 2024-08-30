import { motion } from "framer-motion";
import React, { useState } from "react";
import { fadeInOut } from "../../animations";
import { FaFileImage } from "react-icons/fa6";
import { IIMAGE_URL } from "../../utils/constants";

const ImageInput = ({ image, handleImageChange, error, selectedImage }) => {
  console.log(image, selectedImage);
  return (
    <div className="w-full py-2">
      <label
        htmlFor=""
        className="text-sm font-semibold uppercase text-gray-700"
      >
        Image
      </label>

      <div className="flex ">
        {selectedImage && (
          <img
            src={`${IIMAGE_URL}/${selectedImage}`}
            alt="Selected preview"
            className="h-full min-w-[200px] max-w-[200px] rounded-md object-contain transition-all  "
          />
        )}
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Selected preview"
            className="h-full min-w-[200px] max-w-[200px] rounded-md object-contain   transition-all "
          />
        ) : (
          <div className="flex h-48 w-[200px]  flex-col justify-center  rounded-md border-2  border-dotted border-gray-400 bg-gray-200">
            <FaFileImage className="m-auto text-5xl opacity-60" />
            <span className="text-center">Choose button select new image</span>
          </div>
        )}
        {error && (
          <motion.div
            {...fadeInOut}
            className="ml-1 mt-0.5  min-h-[24px] self-start text-sm text-red-600 "
          >
            {error}
          </motion.div>
        )}

        <input
          className="mt-2 w-24 cursor-pointer text-gray-700"
          id="image"
          type="file"
          // accept="image/*"
          onClick={(e) => (e.target.value = null)}
          aria-label="Upload image"
          onChange={(event) => {
            handleImageChange(event.target.files[0]);
          }}
        />
      </div>
      {image && (
        <button
          className="mt-2 rounded border border-gray-400 bg-gray-200 px-4 "
          onClick={(event) => {
            handleImageChange("DELETE_IMAGE");
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default ImageInput;
