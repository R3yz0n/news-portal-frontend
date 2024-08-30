import React from "react";
import { useNavigate } from "react-router-dom";
import { IIMAGE_URL } from "../../utils/constants";

const News = ({ title, image, author, id }) => {
  const navigate = useNavigate();
  const redirectToDetailsPage = () => {
    navigate(`news-details/${id}`);
  };
  return (
    <section
      className="mx-auto flex w-full   flex-col gap-3    "
      onClick={redirectToDetailsPage}
    >
      <img
        className=" h-52 cursor-pointer    rounded-tl-lg rounded-tr-lg object-cover hover:saturate-150 md:h-64"
        src={`${IIMAGE_URL}/${image}`}
        alt=""
        loading="lazy"
      />
      <h3 className=" mt-1  line-clamp-2  h-auto min-h-10 w-full font-Mukta font-bold leading-5 text-slate-800 md:text-lg xl:w-full xl:text-[22px] ">
        {title}
      </h3>
      <p className=" w-full font-Mukta text-sm   font-normal leading-normal text-black md:-mt-0 md:text-base ">
        {author}
      </p>
    </section>
  );
};

export default News;
