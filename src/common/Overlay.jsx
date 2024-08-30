import React from "react";
import { IIMAGE_URL } from "../utils/constants";
import ImageSkeleton from "./ImageSkeleton";

export const ImageOverlay = ({ children, ...props }) => {
  return (
    <section
      className={`h-[400px]  w-full ${
        props.isMainImg === true
          ? "md:h-[500px] lg:h-[650px]"
          : "md:h-[460px] lg:h-[480px]"
      }  relative  -z-50 flex flex-col items-end justify-start  gap-4 rounded-lg   md:z-auto `}
    >
      {props.isLoading || props.loading ? (
        <ImageSkeleton />
      ) : (
        <>
          <aside
            className={`absolute inset-0 bg-black  ${props.containerBgOpacity}`}
          ></aside>

          <img
            src={`${IIMAGE_URL}/${props.image}`}
            alt="hero"
            className={`-z-50 h-full w-full rounded-md object-cover  duration-300 ease-in-out group-hover:scale-105  ${props.style} `}
            loading="lazy"
          />
          <div
            className={`w-full bg-black px-3 py-3 ${props.textBgOpacity}    absolute bottom-0 flex  min-h-12 items-center md:h-20 lg:h-24`}
          >
            <h3 className="w-full truncate text-center font-Mukta text-sm font-semibold text-white sm:text-xl md:text-2xl md:tracking-wider lg:text-3xl">
              {props.title}
            </h3>
          </div>
        </>
      )}
    </section>
  );
};
