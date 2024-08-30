import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsSection from "../news-section/NewsSection";
import LatestNews from "../components/latest-news/LatestNews";
import LatestOFLatestNews from "../components/latest-news/LatestOFLatestNews";
import adsgif from "../assests/15998500.gif";
import smallads from "../assests/small_sidebar.gif";
import dashboard from "../assests/DashboardIllustration.png";
import { fetchAllHomepageAds } from "../store/ads/adsAction";
import { IIMAGE_URL } from "../utils/constants";

const HomePage = () => {
  const { homePagePost } = useSelector((state) => state.post);
  const { sidebarAds } = useSelector((state) => state.ads);
  const dispatch = useDispatch();

  return (
    <>
      <LatestOFLatestNews />
      <LatestNews />
      <main className="flex gap-6">
        <section className="flex flex-col md:w-4/5">
          {homePagePost?.map((category, index) => (
            <div className=" flex ">
              <NewsSection
                catId={category?.id}
                key={category?.id}
                name={category.name}
                post={category.post}
                slug={category.slug}
              />
            </div>
          ))}
        </section>
        <aside className=" items-top  hidden w-1/5 flex-col items-end md:flex ">
          <div className="flex flex-col gap-16 ">
            {sidebarAds?.map((ads, i) => (
              <img
                src={`${IIMAGE_URL}/${ads?.image}`}
                alt="ads"
                className="w-full rounded-md object-contain"
              />
            ))}
          </div>
        </aside>
      </main>
    </>
  );
};

export default HomePage;
