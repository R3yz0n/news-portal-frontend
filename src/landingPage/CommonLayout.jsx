import React from "react";
import { Header } from "../components/header/Header";
import AdvertisementBanner from "../components/advertisement-banner/AdvertisementBanner";
import HeadlineNews from "../components/headline-news/HeadlineNews";
import Footer from "../components/footer/Footer";
import { useLocation } from "react-router-dom";

const CommonLayout = ({ children }) => {
  const location = useLocation();

  return (
    <>
      <Header />
      <section className="mx-auto  mb-6 mt-28 flex max-w-[1280px] flex-col gap-12 px-8 sm:gap-12 md:mt-12 xl:px-0 ">
        <HeadlineNews />
        {location.pathname === "/ntg" && <AdvertisementBanner />}
        {children}
      </section>
      <Footer />
    </>
  );
};

export default CommonLayout;
