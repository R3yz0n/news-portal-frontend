import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByCategory } from "../store/post/postAction";
import { useLocation, useNavigate } from "react-router-dom";
import News from "./News";
import { motion } from "framer-motion";
import { fadeInOut } from "../animations";
import { ImageOverlay } from "../common/Overlay";
import AdvertisementBanner from "../components/advertisement-banner/AdvertisementBanner";
import image from "../assests/AllCategory.png";
import { fetchSpecificCategoryAds } from "../store/ads/adsAction";

const NewsByCategory = ({ category }) => {
  const dispatch = useDispatch();
  const { postByCategory, loading } = useSelector((state) => state.post);
  const { specificCategoryAds } = useSelector((state) => state.ads);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  console.log(specificCategoryAds);

  const adsImage = specificCategoryAds;

  useEffect(() => {
    window.scroll(0, 0);
    let converted = decodeURIComponent(category?.slug);

    setIsLoading(true);

    dispatch(getPostsByCategory(converted)).then(() => {
      const loadingTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(loadingTimeout);
    });

    dispatch(fetchSpecificCategoryAds(category?.slug));
  }, [category?.slug, dispatch, location.pathname]);

  const featuredPost = postByCategory[0];
  const redirectToDetailsPage = (id) => {
    navigate(`/news-details/${id}`);
  };

  return (
    <main className="-mt-6 w-full px-2 md:px-8 lg:px-3 xl:px-0 ">
      {adsImage.length > 0 && <AdvertisementBanner ads={adsImage} />}
      <div
        className="group mt-8 cursor-pointer overflow-hidden"
        onClick={() => redirectToDetailsPage(featuredPost?.id)}
      >
        {featuredPost && (
          <ImageOverlay
            isLoading={isLoading}
            loading={loading}
            image={featuredPost?.featured_image.name}
            title={featuredPost?.title}
            containerBgOpacity="bg-opacity-10"
            textBgOpacity="bg-opacity-50"
          />
        )}
      </div>

      {isLoading || loading ? (
        <motion.div
          {...fadeInOut}
          className="mx-auto mb-8 mt-14 grid w-full gap-x-8  gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:px-0"
        >
          {[...Array(8)].map((_, index) => (
            <Skeleton key={index} />
          ))}
        </motion.div>
      ) : (
        <div className="mx-auto mb-8 mt-14 grid w-full gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:px-0 ">
          {postByCategory.slice(1).map((news) => (
            <News
              key={news.id}
              title={news.title}
              image={news.featured_image.name}
              author={news.author}
              body={news.body}
              id={news.id}
            />
          ))}
          {postByCategory.length === 0 && (
            <p className="min-h-80 text-lg font-semibold tracking-wider text-red-500 lg:min-h-72">
              No News found.
            </p>
          )}
        </div>
      )}
    </main>
  );
};

export default NewsByCategory;

const Skeleton = ({ width = "100%", height = "100%", radius = "md" }) => {
  return (
    <div
      className={`p-4 rounded-${radius} bg-gray-100`}
      style={{ width, height }}
    >
      <div className="mb-3 h-24 animate-pulse rounded-md bg-gray-200"></div>
      <div className="mb-2 h-4 w-2/3 animate-pulse rounded-full bg-gray-200"></div>
      <div className="mb-2 h-4 w-1/2 animate-pulse rounded-full bg-gray-200"></div>
      <div className="h-4 w-3/4 animate-pulse rounded-full bg-gray-200"></div>
    </div>
  );
};
