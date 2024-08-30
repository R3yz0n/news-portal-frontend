import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import CommonLayout from "./CommonLayout";
import NewsDetails from "../common/NewsDetails";
import { useDispatch, useSelector } from "react-redux";
import NewsByCategory from "../category-news/NewsByCategory";

import Scroller from "../common/Scroller";
import NotFoundPage from "../common/NotFoundPage";
import { useEffect, useState } from "react";
// import popupAds from "../assests/popup_ads.gif";
import AdsPopup from "./AdsPopup";
import { fetchAllHomepageAds } from "../store/ads/adsAction";

const LandingPage = () => {
  const { categories } = useSelector((state) => state.category);
  const [showPopup, setShowPopup] = useState(true);
  const { popupAds } = useSelector((state) => state.ads);
  const popupImage = popupAds[0]?.image;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllHomepageAds());
  }, [dispatch]);

  console.log();

  useEffect(() => {
    if (showPopup && popupImage) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [popupImage, showPopup]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <main id="TOP">
      <CommonLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="*"
            element={
              <NotFoundPage
                title="Unable to load page"
                message="The page you are looking for is not available."
              />
            }
          />
          {categories.map((category) => (
            <Route
              key={category.id}
              path={category?.slug}
              element={<NewsByCategory category={category} />}
            />
          ))}
          <Route path="/news-details/:id" element={<NewsDetails />} />
        </Routes>
      </CommonLayout>

      {showPopup && <AdsPopup closePopup={closePopup} popupAds={popupImage} />}

      <Scroller />
    </main>
  );
};

export default LandingPage;
