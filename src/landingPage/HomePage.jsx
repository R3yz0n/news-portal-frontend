import { useDispatch, useSelector } from "react-redux";
import LatestOFLatestNews from "../components/latest-news/LatestOFLatestNews";
import NewsSection from "../news-section/NewsSection";
import { IIMAGE_URL } from "../utils/constants";

const HomePage = () => {
  const { homePagePost } = useSelector((state) => state.post);
  const { sidebarAds } = useSelector((state) => state.ads);
  const dispatch = useDispatch();

  return (
    <>
      <LatestOFLatestNews />
      {/* <LatestNews /> */}
      <main className="flex gap-6">
        <section className=" flex flex-col md:w-4/5">
          {homePagePost?.map((category, index) => (
            <div className=" flex " key={index}>
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
            {sidebarAds?.map(
              (ads, i) =>
                ads && (
                  <img
                    src={`${IIMAGE_URL}/${ads?.ads_image?.name}`}
                    alt="ads"
                    className="w-full rounded-md object-contain"
                  />
                ),
            )}
          </div>
        </aside>
      </main>
    </>
  );
};

export default HomePage;
