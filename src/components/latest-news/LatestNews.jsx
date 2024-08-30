import React from "react";
import News from "./News";
import HorizontalLine from "../../common/HorizontalLine";
import NewsTypeTitle from "../../common/NewsTypeTitle";
import { useSelector } from "react-redux";
import NotFoundPage from "../../common/NotFoundPage";

const LatestNews = () => {
  const { latestNews } = useSelector((state) => state.post);
  if (latestNews?.length === 0)
    return (
      <>
        <NotFoundPage
          title="No latest news found."
          message="How about checking back in a moment ? ✨"
        />
      </>
    );
  return (
    <main className="w-full">
      <NewsTypeTitle title="ताजा समाचार " />

      <HorizontalLine />

      <div className=" mx-auto my-8  grid w-full gap-x-8 gap-y-10 sm:grid-cols-2  md:grid-cols-3 xl:gap-x-10  xl:px-0 ">
        {latestNews?.slice(1, 7).map((news) => (
          <News
            key={news.id}
            title={news.title}
            image={news.featured_image.name}
            author={news?.author}
            id={news.id}
          />
        ))}
      </div>
    </main>
  );
};

export default LatestNews;
