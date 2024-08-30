import React from "react";
import news from "../../assests/rect.png";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";

const HeadlineNews = () => {
  const { headlineNews } = useSelector((state) => state.post);

  if (!headlineNews.length) return <></>;
  return (
    <main className="relative  -z-50 flex w-full items-center overflow-hidden  rounded-lg bg-headlineBgColorSecondary ">
      <img
        src={news}
        className="absolute z-10 h-[50px] sm:h-auto"
        alt="latest news"
      />
      <h3 className=" absolute left-2 top-3 z-10  px-1 font-Mukta font-semibold text-white sm:h-full lg:text-xl">
        प्रमुख समाचार
      </h3>

      <Marquee
        className=" absolute left-3 bg-headlineBgColorSecondary  py-3 tracking-wide  text-white sm:px-6 md:text-base md:font-semibold lg:text-lg  "
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
