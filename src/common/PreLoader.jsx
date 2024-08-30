import React from "react";
import { motion } from "framer-motion";
import { HashLoader, ScaleLoader } from "react-spinners";
import { fadeInOut } from "../animations";

import { Typewriter } from "react-simple-typewriter";

const PreLoader = () => {
  return (
    <motion.div
      className="opacity-50 fixed  flex-col gap-6  z-50 inset-0 backdrop-blur-[2px] flex items-center justify-center  w-screen min-h-screen backdrop-filter   bg-navbarBgColor"
      {...fadeInOut}
    >
      <ScaleLoader className="text-white" color="white" height={50} width={7} />
    </motion.div>
  );
};

export default PreLoader;
