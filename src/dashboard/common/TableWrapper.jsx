import React from "react";
import { Link } from "react-router-dom";
import { BsToggles2 } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { btnClick } from "../../animations";

const TableWrapper = ({ children, ...props }) => {
  return (
    <div className=" relative mt-8 rounded-lg bg-transparent">
      <div className="relative mb-3 flex w-full justify-between">
        <h2 className="  ml-1 flex items-center gap-2 text-xl font-bold uppercase tracking-wide text-gray-800">
          {props.icon}
          {props.title}
        </h2>
        {props.paginate && (
          <div className="focus:border-blue -top-1 right-[20%] flex items-center justify-center gap-3 rounded border border-gray-300  bg-gray-50 px-4 py-1.5 text-gray-600  shadow-sm md:absolute xl:right-[15%] ">
            <FaSearch className="text-lg text-gray-700 " />
            <input
              type="text"
              placeholder="Search here.."
              className=" w-32 bg-transparent text-base outline-none md:w-48 lg:w-52"
              onInputCapture={props.handleResetPage}
              onChange={(e) => {
                if (e.target.value.length === 0) props.handleResetPage();
                props.handleSearch(e.target.value);
              }}
            />
            <BsToggles2 className="text-2xl text-gray-700" />
          </div>
        )}

        {props.isAddBtnHidden ? (
          <></>
        ) : (
          <Link
            className="btn-blue mr-1 px-4 py-2 text-xs font-bold"
            to={props.link}
          >
            Add Details
          </Link>
        )}
      </div>
      <div className=" scrollbar-thin h-[75vh] overflow-scroll  ">
        {children}
      </div>

      {props.paginate && (
        <h2 className="mt-2 flex justify-end gap-4 px-0.5">
          {props.page !== 0 && (
            <motion.button
              {...btnClick}
              className="rounded bg-blue-500 px-4 text-gray-100"
              onClick={props.handlePrevPage}
            >
              Prev
            </motion.button>
          )}
          {!(Math.ceil(props.total / 10) === props.page + 1) && (
            <motion.button
              {...btnClick}
              className="rounded bg-blue-500 px-4 text-gray-100"
              onClick={props.handleNextPage}
            >
              Next
            </motion.button>
          )}
          <button className="rounded bg-gray-500 px-3 text-sm text-gray-100">
            Page {props.page + 1} of {Math.ceil(props.total / 10)}
          </button>
        </h2>
      )}
    </div>
  );
};

export default TableWrapper;
