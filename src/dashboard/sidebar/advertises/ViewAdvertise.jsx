import React, { useEffect, useState } from "react";
import ViewWrapper from "../../common/ViewWrapper";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAdvertisesOfClient } from "../../../store/advertises/advertisesAction";
import { IIMAGE_URL } from "../../../utils/constants";
import { fadeInOut } from "../../../animations";
import { motion } from "framer-motion";
import AdvertiseSummayForClient from "./AdvertiseSummayForClient";
import { RiFileInfoFill } from "react-icons/ri";

const ViewAdvertise = () => {
  const { id } = useParams();
  const { advertisesByClient, error, loading } = useSelector(
    (state) => state.advertises,
  );
  const dispatch = useDispatch();
  const [selectedAdImage, setSelectedAdImage] = useState(null);
  const [selectedAdDescription, setSelectedAdDescription] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePreviewClick = ({ ads_image, description }) => {
    setSelectedAdImage(ads_image?.name || null);
    setSelectedAdDescription(description);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAdImage(null);
    setSelectedAdDescription("");
  };
  useEffect(() => {
    if (id) dispatch(fetchAllAdvertisesOfClient(id));
  }, [id, dispatch]);
  return (
    <ViewWrapper
      title="advertises information"
      icon={<RiFileInfoFill className="text-3xl" />}
    >
      <main className=" min-h-[400px] w-full">
        <AdvertiseSummayForClient advertisesByClient={advertisesByClient} />

        <aside className=" mt-2  flex max-h-[400px] flex-col overflow-auto overflow-x-scroll px-0 py-5">
          <div className="flex bg-[rgb(218,221,228)] px-2 font-bold ">
            <div className=" w-2/6 p-2">Ads Name</div>
            <div className=" w-1/6 p-2">Status</div>
            <div className=" w-1/6 p-2">Start Date</div>
            <div className=" w-1/6 p-2">End Date</div>
            <div className=" w-1/6 p-2">Total</div>
            <div className=" w-1/6 p-2">Discount</div>
            <div className=" w-28 p-2">More Info</div>
          </div>

          {loading ? (
            <motion.div
              {...fadeInOut}
              className="flex w-full p-2 text-lg text-red-700"
            >
              <p>Loading...</p>
            </motion.div>
          ) : advertisesByClient?.advertisement?.length > 0 ? (
            advertisesByClient?.advertisement?.map((advertise, i) => (
              <React.Fragment key={advertise?.id}>
                <section className="flex overflow-x-scroll">
                  <div className="  w-full ">
                    <div
                      className={
                        i % 2 === 0
                          ? "flex bg-gray-100 py-1 "
                          : "flex bg-white py-1"
                      }
                    >
                      <div className="  w-2/6  p-2">{advertise?.name}</div>
                      <div className="w-1/6 p-2">
                        {advertise?.status === true ? "Active" : "Not Active"}
                      </div>
                      <div className="w-1/6 p-2">{advertise?.start_date}</div>
                      <div className="w-1/6 p-2">{advertise?.end_date}</div>
                      <div className="w-1/6 p-2">
                        Rs. {advertise?.total_price}
                      </div>
                      <div className="w-1/6 p-2">Rs. {advertise?.discount}</div>
                      <div className=" flex w-28 items-center justify-center p-2">
                        <span
                          className="cursor-pointer rounded-sm bg-blue-500 px-3 text-sm text-gray-100"
                          onClick={() =>
                            handlePreviewClick({
                              ads_image: advertise?.ads_image,
                              description: advertise?.description,
                            })
                          }
                        >
                          Preview
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </React.Fragment>
            ))
          ) : (
            <motion.div
              {...fadeInOut}
              className="flex w-full p-2 text-lg text-red-700"
            >
              <p>{error?.length > 0 ? error : "No Advertises Found."}</p>
            </motion.div>
          )}
        </aside>
        {isModalOpen && (
          <Modal
            image={selectedAdImage}
            description={selectedAdDescription}
            onClose={closeModal}
          />
        )}
      </main>
    </ViewWrapper>
  );
};

export default ViewAdvertise;

const Modal = ({ image, onClose, description }) => {
  console.log(description);
  return (
    <main className="fixed left-0 top-0 flex h-screen w-screen items-center  justify-center bg-black bg-opacity-80">
      <section className="relative flex h-auto max-h-[600px]  w-min flex-col rounded-sm  bg-opacity-70 ">
        <button
          className="absolute right-0 top-0 rounded bg-red-500 px-3 py-0.5 text-gray-100"
          onClick={onClose}
        >
          X
        </button>
        <img
          src={`${IIMAGE_URL}/${image}`}
          className="m-auto max-h-[80%] min-h-[30px] min-w-[500px] max-w-full object-contain"
          alt="sss"
        />
      </section>
    </main>
  );
};
