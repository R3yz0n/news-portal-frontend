import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostsById } from "../store/post/postAction";
import { IIMAGE_URL } from "../utils/constants";
import ImageSkeleton from "./ImageSkeleton";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { FaPrint } from "react-icons/fa";
import { btnClick } from "../animations";
import { motion } from "framer-motion";

const NewsDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { postById, loading } = useSelector((state) => state.post);
  const componentRef = useRef();

  useEffect(() => {
    if (window.innerWidth > 768) window.scrollTo(0, 220);
    else window.scrollTo(0, 0);
  });

  useEffect(() => {
    dispatch(getPostsById(params?.id));
  }, [dispatch, params?.id]);

  const formattedDate = moment(postById?.created_at)?.format("YYYY-MM-DD");
  const displayDate = formattedDate?.replace(/-/g, " ");
  const dayOfWeekName = moment(postById?.created_at).format("dddd");

  const image = `${IIMAGE_URL}/${postById?.featured_image?.name}`;
  const { postDetailAds } = useSelector((state) => state.ads);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <main className=" container mx-auto px-1 sm:p-2 md:p-8">
      <section
        className="flex flex-col gap-4 md:gap-8 print:p-10"
        ref={componentRef}
      >
        <div className="h-[320px] w-full object-contain md:h-[500px]">
          {loading || !image ? (
            <ImageSkeleton />
          ) : (
            <img
              src={image}
              className="h-full w-full object-cover"
              loading="lazy"
              alt="Post Cover"
            />
          )}
        </div>

        <h3 className="mt-0 text-lg font-bold leading-tight text-gray-800 sm:text-lg md:mt-4 md:text-4xl">
          {postById?.title}
        </h3>
        <p className="flex flex-col-reverse gap-3 text-sm font-semibold text-gray-600 md:flex-row">
          <span>Author: {postById?.author} </span>
          <span>
            | {displayDate}, {dayOfWeekName}
          </span>
        </p>
        <div className=" place-self-start rounded-sm bg-black bg-opacity-20">
          {postDetailAds[0]?.image && (
            <img
              src={`${IIMAGE_URL}/${postDetailAds[0]?.image}`}
              alt=""
              className="h-[80px] w-full object-contain md:h-[100px] "
              loading="lazy"
            />
          )}
        </div>
        <p
          className="text-justify text-base leading-7 text-gray-600 sm:mt-3 sm:text-xl md:leading-8"
          dangerouslySetInnerHTML={{ __html: postById?.body }}
        />
      </section>

      {/* TODO : map over the remaining postdetailAds */}
      <div className=" float-left my-4 rounded-sm bg-black bg-opacity-20">
        <img
          src={`${IIMAGE_URL}/${postDetailAds[0]?.image}`}
          alt=""
          className="h-[100px] w-full object-contain"
          loading="lazy"
        />
      </div>
      <div className=" float-left my-2 rounded-sm bg-black bg-opacity-20">
        <img
          src={`${IIMAGE_URL}/${postDetailAds[0]?.image}`}
          alt=""
          className="h-[100px] w-full object-contain"
          loading="lazy"
        />
      </div>

      <motion.button
        {...btnClick}
        className="float-right my-2 flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
        onClick={handlePrint}
      >
        <FaPrint />
        Print News
      </motion.button>
    </main>
  );
};

export default NewsDetails;
