import React from "react";
import { MdLogout } from "react-icons/md";

import { motion } from "framer-motion";
import { btnClick } from "../../animations";
import { logout } from "../../store/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAdvertisementData } from "../../store/advertisement/advertisementSlice";
import { clearUserData } from "../../store/user/userSlice";
import { clearClientData } from "../../store/client/ClientSlice";
import { clearAdvertisesData } from "../../store/advertises/advertisesSlice";
import { clearTransactionData } from "../../store/transaction/transactionSlice";
import { clearCompanyData } from "../../store/company/companySlice";

const DBHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <section className="  flex w-full items-center justify-between gap-3 px-1">
      <h3 className="font-sans text-2xl font-extrabold text-gray-700 ">
        Khurak Media Pvt. Ltd.
      </h3>

      <div className=" flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-2">
            <motion.div
              {...btnClick}
              onClick={() => {
                dispatch(logout());
                dispatch(clearAdvertisementData());
                dispatch(clearUserData());
                dispatch(clearAdvertisesData());
                dispatch(clearClientData());
                dispatch(clearTransactionData());
                dispatch(clearCompanyData());
                navigate("/login", { replace: true });
              }}
              className="flex  h-8  w-28 cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-300 bg-white font-semibold  text-gray-600  shadow-md shadow-gray-400 backdrop-blur-md"
            >
              Logout
              <MdLogout className="group-hover::text-headingColor  h-10 text-2xl text-gray-500" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DBHeader;
