import React from "react";

const AddWrapper = ({ children, ...props }) => {
  return (
    <main className="relative mb-3 mt-8">
      <div className="flex justify-between ">
        <h2 className="-mt-1.5 flex gap-2 text-xl font-bold uppercase tracking-wide text-gray-800 ">
          {props.icon}
          {props.title}
        </h2>
        <div className="mb-3 flex justify-end ">
          <button
            className="btn-red mr-1 px-4 py-2 text-xs font-bold"
            onClick={() => props.handleBack()}
          >
            Back
          </button>
        </div>
      </div>
      {children}
    </main>
  );
};

export default AddWrapper;
