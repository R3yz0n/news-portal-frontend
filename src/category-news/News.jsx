import React from "react";
import { useNavigate } from "react-router-dom";
import { IIMAGE_URL } from "../utils/constants";
import moment from "moment";
import { AiOutlineUser } from "react-icons/ai";

const News = ({ title, image, day, date, body, id, author }) => {
  const navigate = useNavigate();
  const redirectToDetailsPage = () => {
    navigate(`/news-details/${id}`);
  };

  let formattedDate = moment(date)?.format("YYYY-MM-DD");
  formattedDate = formattedDate?.replace(/-/g, " ");
  const specificDate = moment(date);
  const dayOfWeekName = specificDate.format("dddd");
  return (
    <section
      className="mx-auto flex   cursor-pointer  flex-col font-Mukta  "
      onClick={redirectToDetailsPage}
    >
      <img
        className="h-52 w-full cursor-pointer  rounded-tl-lg rounded-tr-lg object-cover hover:saturate-150 md:h-64"
        loading="lazy"
        src={`${IIMAGE_URL}/${image}`}
        alt="photoss"
      />

      <div className="flex flex-col  gap-2 rounded-b-lg rounded-t-sm  border-b-2 border-l-2 border-r-2 border-gray-400 border-opacity-70 px-6 py-5">
        <p className="flex gap-3 text-sm leading-tight text-slate-800">
          <span>{formattedDate}</span>
          <span> | {dayOfWeekName}</span>
        </p>
        <h3 className="    mt-1 line-clamp-2 h-auto font-Mukta text-lg font-bold leading-7 text-slate-800">
          {title}
        </h3>
        <p className="flex gap-3 text-sm leading-tight text-slate-800">
          <AiOutlineUser /> {author}
        </p>

        {/* <p
          className="   line-clamp-3 h-[70px] font-Mukta text-base font-normal leading-normal text-black"
          dangerouslySetInnerHTML={{ __html: body }}
        /> */}
      </div>
    </section>
  );
};

export default News;
