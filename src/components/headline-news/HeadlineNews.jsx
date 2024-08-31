import React from "react";
import news from "../../assests/rect.png";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";

const HeadlineNews = () => {
  const { headlineNews } = useSelector((state) => state.post);

  if (!headlineNews.length) return <></>;
  return (
    <main className="relative -z-50 -mt-4  flex w-full items-center overflow-hidden rounded-lg  bg-headlineBgColorSecondary md:-mt-0 ">
      <img
        src={news}
        className="absolute z-10 h-10 sm:h-auto md:h-[50px]"
        alt="latest news"
      />
      <h3 className=" absolute left-2 top-3 z-10 -mt-1 px-1  font-Mukta text-sm font-semibold text-white sm:h-full md:mt-0 md:text-base lg:text-xl">
        प्रमुख समाचार
      </h3>

      <Marquee
        className=" absolute left-3 bg-headlineBgColorSecondary py-2 text-sm  tracking-wide text-white  sm:px-6 sm:py-3 md:text-base md:font-semibold lg:text-lg  "
        speed={150}
      >
        <h4 className=" flex ">
          {headlineNews?.map((news) => (
            <React.Fragment key={news.id}>
              <span className="px-5" key={news.id}>
                {news.title}
              </span>
              <span className="font-extrabold text-gray-200">|</span>
            </React.Fragment>
          ))}
        </h4>
      </Marquee>
    </main>
  );
};

export default HeadlineNews;
