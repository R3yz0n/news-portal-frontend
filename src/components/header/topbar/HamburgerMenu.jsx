import React from "react";

const HamburgerMenu = (props) => {
  const { useState } = React;
  const [isOpen, setIsOpen] = useState(false);

  const genericHamburgerLine = `h-1   border-black border   w-8 sm:w-10 my-1 rounded-full bg-black transition ease transform duration-300`;

  return (
    <button
      className={`group -mt-1 mr-2 flex h-10 w-14 flex-col  items-center justify-center rounded sm:-mt-0 ${props.style}  md:hidden`}
      // onClick={() => setIsOpen(!isOpen)}
      onClick={props.toggleMenu}
    >
      <div
        className={`${genericHamburgerLine} ${
          props.isOpen
            ? "translate-y-3     rotate-[45deg] opacity-70 group-hover:opacity-75"
            : "h-[4px] opacity-70 group-hover:opacity-75"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          props.isOpen
            ? "opacity-0"
            : "h-[4px] opacity-70 group-hover:opacity-75"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          props.isOpen
            ? "-translate-y-3   -rotate-[45deg] opacity-70 group-hover:opacity-75"
            : "h-[4px] opacity-70 group-hover:opacity-75"
        }`}
      />
    </button>
  );
};

export default HamburgerMenu;
