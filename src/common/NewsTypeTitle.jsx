import React from "react";

const NewsTypeTitle = ({ title }) => {
  return (
    <h2 className="mb-1 font-['Mukta'] text-2xl font-semibold leading-10 text-black md:mb-2 md:text-3xl lg:mb-0 lg:text-newsType lg:leading-[60px] ">
      {title}
    </h2>
  );
};

export default NewsTypeTitle;
