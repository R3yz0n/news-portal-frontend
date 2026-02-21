import React from "react";
import NewsTypeTitle from "../common/NewsTypeTitle";
import HorizontalLine from "../common/HorizontalLine";
import News from "./News";
import { ImageOverlay } from "../common/Overlay";
import { useNavigate } from "react-router-dom";
import { btnClick } from "../animations";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { IIMAGE_URL } from "../utils/constants";

const NewsSection = ({ post, name, slug, catId }) => {
  const navigate = useNavigate();
  const featuredPost = post[0];
  const { endCategoryAds } = useSelector((state) => state.ads);
  const redirectToCategoryPage = (slug) => navigate(`${slug}`);
  const redirectToDetailsPage = (id) => {
    navigate(`/news-details/${id}`);
  };
  console.log(endCategoryAds);
  if (post.length < 1)
    return (
      <section className="min-h-16 flex-big">
        <NewsTypeTitle title={name} />
        <HorizontalLine />
        <div className="flex h-80 items-center justify-center">
          <h1 className="text-2xl text-gray-400">
            No updates yet. Please check back later.
          </h1>
        </div>
      </section>
    );
  return (
    <main className="  relative h-auto w-full">
      <section className="min-h-16">
        <NewsTypeTitle title={name} />
        <HorizontalLine />

        <div
          className="group mt-10 cursor-pointer overflow-hidden"
          onClick={() => redirectToDetailsPage(featuredPost?.id)}
        >
          <ImageOverlay
            image={featuredPost?.featured_image.name}
            title={featuredPost?.title}
            style=""
            containerBgOpacity="bg-opacity-10"
            textBgOpacity="bg-opacity-50"
          />
        </div>

        <div className="my-8 grid grid-cols-1 gap-x-6 gap-y-16 px-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ">
          {post?.slice(1).map((news) => (
            <News
              catId={catId}
              image={news?.featured_image?.name}
              title={news.title}
              key={news.id}
              id={news.id}
              body={news.body}
              date={news.created_at}
              author={news?.author}
            />
          ))}
        </div>
      </section>
      <motion.button
        onClick={() => redirectToCategoryPage(slug)}
        {...btnClick}
        className="mb-5 rounded-md bg-navbarBgColor px-5 py-1.5 font-medium text-white hover:brightness-125 sm:py-2 sm:font-semibold"
      >
        <span>+</span> थप सामाग्री
      </motion.button>
      {/* end category */}
      {endCategoryAds[catId - 1]?.image && (
        <div className=" mb-8 rounded-sm  bg-opacity-20">
          <img
            src={`${IIMAGE_URL}/${endCategoryAds[catId - 1]?.ads_image?.name}`}
            alt=""
            className="h-[100px] w-full object-contain"
            loading="lazy"
          />
        </div>
      )}
    </main>
  );
};

export default NewsSection;
