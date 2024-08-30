import React, { useState } from "react";
import Topbar from "./topbar/Topbar";
import Navbar from "./navbar/Navbar";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="fixed top-0 md:static z-40 w-full bg-white py-2 md:px-0 md:py-0 md:pt-4 xl:px-0">
      <Topbar isOpen={isOpen} toggleMenu={toggleMenu} />
      <Navbar isOpen={isOpen} toggleMenu={toggleMenu} />
    </header>
  );
};
