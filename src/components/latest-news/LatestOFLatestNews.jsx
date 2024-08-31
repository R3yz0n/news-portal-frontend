import React from "react";
import { ImageOverlay } from "../../common/Overlay";
import { useSelector } from "react-redux";
import { isObject } from "formik";
import { useNavigate } from "react-router-dom";

const LatestOFLatestNews = () => {
  const { latestNews } = useSelector((state) => state.post);
  const navigate = useNavigate();
  const redirectToDetailsPage = (id) => {
    navigate(`/news-details/${id}`);
  };
  let featuredLatestNews = latestNews[0];
  if (!isObject(featuredLatestNews)) return <></>;
  return (
    <section
      className=" group h-auto  w-full cursor-pointer  overflow-hidden "
      onClick={() => redirectToDetailsPage(featuredLatestNews?.id)}
    >
      <ImageOverlay
        image={featuredLatestNews?.featured_image?.name}
        style=""
        isMainImg={true}
        containerBgOpacity="bg-opacity-10"
        textBgOpacity="bg-opacity-50"
        title={featuredLatestNews.title}
      />
    </section>
  );
};

export default LatestOFLatestNews;
