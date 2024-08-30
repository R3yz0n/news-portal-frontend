import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInOut } from "../../../animations";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAdvertises } from "../../../store/advertises/advertisesAction";
import { FaEdit, FaEye } from "react-icons/fa";
import { SiAmazonpay } from "react-icons/si";
import { clearFields } from "../../../store/advertises/advertisesSlice";
import PaymentModal from "./PaymentModal";
const AdvertisesTable = ({ page, searchKeyword }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [client, setClient] = useState({
    name: "",
    id: null,
    remainingAmount: 0,
  });

  // useEffect(() => {
  //   console.log("s");
  //   dispatch(fetchAllAdvertises());
  // }, [dispatch, showModal]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchKeyword.length > 0)
        dispatch(
          fetchAllAdvertises({ page: page, size: 10, filter: searchKeyword }),
        );
    }, 1000);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [dispatch, page, searchKeyword, showModal]);

  useEffect(() => {
    if (searchKeyword.length === 0)
      dispatch(
        fetchAllAdvertises({ page: page, size: 10, filter: searchKeyword }),
      );
  }, [dispatch, page, searchKeyword, showModal]);

  const handleSelectClient = (id, name, remainingAmount) => {
    setClient({
      ...client,
      name: name,
      id: id,
      remainingAmount: remainingAmount,
    });
    setShowModal(true);
  };
  const { clientData, loading, error } = useSelector(
    (state) => state.advertises,
  );

  const advertisesColumns = [
    { label: "Client Name" },
    { label: "Total" },
    { label: " Paid" },
    { label: "Payable" },
    { label: "Action", isIcon: true },
  ];
  return (
    <div className="min-w-full">
      <table className="static min-w-full">
        <thead className="  sticky top-0 bg-[rgb(218,221,228)] font-sans text-[17px]  text-gray-800 shadow-md">
          <tr>
            {advertisesColumns?.map((column, index) => (
              <th key={index} className="px-6 py-3 text-left">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`scrollbar-track-black  overflow-y-scroll `}>
          {loading ? (
            <motion.tr
              {...fadeInOut}
              className="flex w-full p-2 text-lg text-red-700"
            >
              <td>Loading...</td>
            </motion.tr>
          ) : clientData?.length > 0 ? (
            clientData?.map((advertises, index) => (
              <React.Fragment key={advertises?.id}>
                {advertises?.total > 0 && (
                  <tr className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <td className="whitespace-nowrap px-6 py-4">
                      {advertises?.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {advertises?.total}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {advertises?.paid_amount}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {advertises?.total - advertises?.paid_amount}
                    </td>

                    <td className="flex h-11 items-center gap-5 pl-8">
                      <button
                        onClick={() =>
                          handleSelectClient(
                            advertises?.id,
                            advertises?.name,
                            advertises?.total - advertises?.paid_amount,
                          )
                        }
                      >
                        <SiAmazonpay className="mt-3 cursor-pointer text-3xl font-semibold duration-300 hover:scale-125 hover:text-gray-700 " />
                      </button>
                      <Link
                        to={`${advertises.id}`}
                        onClick={() => dispatch(clearFields())}
                      >
                        <FaEdit className="mt-3 cursor-pointer text-xl duration-300 hover:scale-125 hover:text-gray-700 " />
                      </Link>
                      <Link
                        to={`view/${advertises?.id}`}
                        onClick={() => dispatch(clearFields())}
                      >
                        <FaEye className="mt-3 cursor-pointer text-xl duration-300 hover:scale-125 hover:text-gray-700 " />
                      </Link>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <motion.tr
              {...fadeInOut}
              className="flex w-full p-2 text-lg text-red-700"
            >
              <td>{error?.length > 0 ? error : "No Advertises Found."}</td>
            </motion.tr>
          )}
        </tbody>
      </table>
      {showModal && (
        <PaymentModal
          id={client.id}
          name={client.name}
          remainingAmount={client.remainingAmount}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      )}
    </div>
  );
};

export default AdvertisesTable;
