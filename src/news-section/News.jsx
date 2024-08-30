import React from "react";
import { useNavigate } from "react-router-dom";
import { IIMAGE_URL } from "../utils/constants";
import moment from "moment";
import { AiOutlineUser } from "react-icons/ai";

const News = ({ title, image, date, author, body, id, catId }) => {
  const navigate = useNavigate();
  const redirectToDetailsPage = () => {
    navigate(`news-details/${id}`);
  };

  const formattedDate = moment(date).format("YYYY-MM-DD");
  const dayOfWeekName = moment(date).format("dddd");
  const randomizeUI = catId % 2 === 0 ? false : true;

  return (
    <section
      className="gap- mx-auto flex w-full cursor-pointer flex-col font-Mukta"
      onClick={redirectToDetailsPage}
    >
      <img
        className="h-52 w-full cursor-pointer rounded-tl-lg rounded-tr-lg object-cover hover:saturate-150 md:h-44"
        loading="lazy"
        src={`${IIMAGE_URL}/${image}`}
        alt="photoss"
      />

      <div className="flex flex-col gap-2 rounded-b-lg rounded-t-sm border-b-2 border-l-2 border-r-2 border-gray-400 border-opacity-70 px-6 py-5">
        {randomizeUI && (
          <p className="flex gap-3 text-sm leading-tight text-slate-800">
            <span>{formattedDate}</span>
            <span> | {dayOfWeekName}</span>
          </p>
        )}
        <h3
          className={`font-Mukta text-lg font-bold leading-7 text-slate-800 ${
            randomizeUI ? "line-clamp-2" : ""
          }`}
        >
          {title}
        </h3>

        {randomizeUI ? (
          <p className="flex gap-3 text-sm leading-tight text-slate-800">
            <AiOutlineUser /> {author}
          </p>
        ) : null}

        {/* {randomizeUI ? (
          <p
            className="   line-clamp-2 h-12 font-Mukta text-base font-normal leading-normal text-gray-700"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        ) : (
          <p className="flex gap-3 text-sm leading-tight text-slate-800">
            By Rohit Sharma
          </p>
        )} */}
      </div>
    </section>
  );
};

export default News;
