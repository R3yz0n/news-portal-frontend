import React from "react";
import { useNavigate } from "react-router-dom";

const EditWrapper = (props) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <main className="relative mt-8 rounded-lg p-3 ">
      <h2 className="-mt-1.5 flex gap-2 text-xl font-bold uppercase tracking-wide text-gray-800 ">
        {props?.icon}
        {props?.title}
      </h2>
      <div className="-mt-5 mb-3 flex justify-end">
        <button
          className="btn-red mr-1 px-5 py-1.5 text-xs  font-bold "
          onClick={handleBack}
        >
          Back
        </button>
      </div>

      {props?.children}
    </main>
  );
};

export default EditWrapper;
