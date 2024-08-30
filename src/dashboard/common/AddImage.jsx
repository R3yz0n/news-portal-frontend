import { motion } from "framer-motion";
import React from "react";
import { FaFileImage } from "react-icons/fa6";
import { fadeInOut } from "../../animations";
import { IIMAGE_URL } from "../../utils/constants";

const AddImage = ({ image, handleImageChange, error, name, width }) => {
  const openImageInNewTab = (e) => {
    if (name) {
      const imageUrl = `${IIMAGE_URL}/${name}`;
      window.open(imageUrl, "_blank");
      return;
    }
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      window.open(imageUrl, "_blank");
    }
  };

  return (
    <div className="w-full py-2">
      <label className="text-sm font-semibold uppercase text-gray-700">
        Image
      </label>

      <figcaption>
        {name && !image ? (
          <div className="flex cursor-pointer items-center">
            <img
              src={`${IIMAGE_URL}/${name}`}
              alt="Selected preview"
              className={`ml-0 h-40  max-w-full self-start rounded-md object-cover transition-all ${width}`}
            />
          </div>
        ) : image ? (
          <div className="flex cursor-pointer items-center">
            <img
              src={URL.createObjectURL(image)}
              alt="Selected preview"
              className={`ml-0 h-40  max-w-full self-start rounded-md object-cover transition-all ${width}`}
            />
          </div>
        ) : (
          <div
            className={`bg-whitetransition-all flex h-40 max-w-full  flex-col justify-center rounded-md border-2 border-dotted border-gray-400 bg-white ${width}`}
          >
            <FaFileImage className="m-auto text-5xl opacity-60" />
          </div>
        )}
        {error && (
          <motion.div
            {...fadeInOut}
            className="ml-1 mt-0.5 min-h-[24px] self-start text-sm text-red-600"
          >
            {error}
          </motion.div>
        )}

        {!image && !name && (
          <input
            className=" mt-2 w-full cursor-pointer text-gray-700"
            type="file"
            accept="image/*"
            onClick={(e) => (e.target.value = null)}
            onChange={(event) => {
              handleImageChange(event.target.files[0]);
            }}
          />
        )}
      </figcaption>
      {name ? (
        <div className="flex gap-3">
          <button
            type="button"
            className="mt-2 rounded border border-gray-400 bg-gray-200 px-4"
            onClick={(e) => {
              openImageInNewTab();
            }}
          >
            Show full image
          </button>
          <button
            className="mt-2 rounded border border-gray-400 bg-gray-200 px-4"
            type="button"
            onClick={(event) => {
              handleImageChange("A");
            }}
          >
            Delete
          </button>
        </div>
      ) : (
        image && (
          <div className="flex gap-3">
            <button
              type="button"
              className="mt-2 rounded border border-gray-400 bg-gray-200 px-4"
              onClick={openImageInNewTab}
            >
              Show full image
            </button>
            <button
              type="button"
              className="mt-2 rounded border border-gray-400 bg-gray-200 px-4"
              onClick={(event) => {
                handleImageChange("DELETE_IMAGE");
              }}
            >
              Delete
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default AddImage;
