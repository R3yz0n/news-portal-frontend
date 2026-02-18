import React, { useEffect, useState } from "react";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const Scroller = () => {
  const [showScrollLink, setShowScrollLink] = useState(false);
  const handleScroll = () => {
    const scrollThreshold = 2000;
    const currentScrollY = window.scrollY;

    if (currentScrollY > scrollThreshold) {
      setShowScrollLink(true);
    } else {
      setShowScrollLink(false);
    }
  };
  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: true,
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {showScrollLink && (
        <ScrollLink
          className="b-10 fixed bottom-5 right-6 z-50 cursor-pointer text-5xl text-red-800 duration-1000 hover:bottom-7"
          activeClass="active"
          to="top-element" // Ensure this matches an element ID in the DOM
          smooth={true}
          duration={500}
          onClick={scrollToTop}
        >
          <IoIosArrowDropupCircle />
        </ScrollLink>
      )}
    </>
  );
};

export default Scroller;
