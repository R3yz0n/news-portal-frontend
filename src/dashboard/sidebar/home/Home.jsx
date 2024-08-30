import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaUserAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdFoodBank } from "react-icons/md";
import CountUp from "react-countup";

import FoodChart from "./FoodChart";
import { useDispatch } from "react-redux";

const Home = () => {
  const [userStats, setUserStats] = useState({});
  const [itemStats, setitemStats] = useState({});
  const [orderStats, setOrderStats] = useState({});
  const dispatch = useDispatch();

  // const fetchDatas = async () => {
  //   try {
  //     await dispatch(getAllUsers()).unwrap();
  //     // await dispatch(getAllItems()).unwrap();
  //     dispatch(clearProductFields());
  //     dispatch(clearFields());

  //     const userStats = await axios.get(`${APIURL}/latest/users`, getToken());
  //     setUserStats(userStats.data);
  //     const itemStats = await axios.get(`${APIURL}/latest/items`, getToken());
  //     setitemStats(itemStats.data);
  //     const orderStats = await axios.get(`${APIURL}/latest/orders`, getToken());
  //     setOrderStats(orderStats.data);
  //   } catch (err) {
  //     console.log(err.message);
  //     toast.error("Something went wrong.");
  //   }
  // };

  // useEffect(() => {
  //   fetchDatas();
  // }, []);

  //   console.log(itemStats);

  return (
    <section className="pb-8 pt-10 ">
      <aside className="flex w-full justify-around py-5 ">
        <Card
          title="Users"
          count={userStats?.totalUsers}
          latest={userStats?.latestUserCount}
          per={userStats?.percentage}
          icon={<FaUserAlt size={28} />}
          bg="bg-[rgb(178,121,255)]"
        />

        <Card
          title="Latest News"
          count={itemStats?.totalItems}
          latest={itemStats?.latestItemCount}
          per={itemStats?.percentage}
          icon={<MdFoodBank size={37} />}
          bg="bg-[rgb(58,203,232)]"
        />

        <Card
          title="Live News"
          count={orderStats?.totalOrders}
          latest={orderStats?.latestOrderCount}
          per={orderStats?.percentage}
          icon={<BsFillCartCheckFill size={32} />}
          bg="bg-[rgb(255,144,98)]"
        />

        <Card
          title="Verified Users"
          count={7}
          latest={1}
          per={12}
          icon={<MdVerified size={33} />}
          bg="bg-[rgb(245,197,37)]"
        />
      </aside>

      <div className="flex px-2 pt-20 lg:gap-24 xl:px-8">
        {/* <PopularFoods /> */}
        <FoodChart />
      </div>

      {/* <div className="flex w-full gap-10 pt-10">
        <Sales />
        <LatestUsers />
      </div> */}
    </section>
  );
};

export default Home;

export const Card = ({ title, latest, bg, icon, count, per }) => {
  // console.log(per);
  return (
    <div
      className={`w-60 rounded px-2 pb-2 pt-3  ${bg} flex h-32 items-center  justify-around text-gray-900 shadow-lg`}
    >
      <aside className="">
        <p className="flex cursor-pointer items-center gap-3 text-xl text-gray-900">
          {icon}
          <CountUp
            className="cursor-pointer text-2xl font-semibold"
            start={0}
            end={count}
          />
        </p>

        <p className="text-headingColor mt-4 font-semibold">{title}</p>
      </aside>

      <aside className="flex flex-col gap-3">
        <CircularProgressbar
          strokeWidth={15}
          value={per}
          className="h-8 w-8 "
          color="red"
          styles={buildStyles({
            pathColor: "white",
            trailColor: "#4338CA",
          })}
        />
        <p className="cursor-pointer text-lg font-bold" title="Recenly added">
          +{latest}
        </p>
      </aside>
    </div>
  );
};
