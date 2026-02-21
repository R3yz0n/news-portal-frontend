import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CountUp from "react-countup";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { MdFoodBank, MdVerified } from "react-icons/md";

const Home = () => {
  return (
    <section className="pb-8 pt-10 ">
      <aside className="flex w-full justify-around py-5 ">
        <Card
          title="Users"
          count={150}
          latest={12}
          per={68}
          icon={<FaUserAlt size={28} />}
          bg="bg-[rgb(178,121,255)]"
        />

        <Card
          title="Latest News"
          count={285}
          latest={23}
          per={82}
          icon={<MdFoodBank size={37} />}
          bg="bg-[rgb(58,203,232)]"
        />

        <Card
          title="Live News"
          count={156}
          latest={8}
          per={45}
          icon={<BsFillCartCheckFill size={32} />}
          bg="bg-[rgb(255,144,98)]"
        />

        <Card
          title="Verified Users"
          count={87}
          latest={5}
          per={58}
          icon={<MdVerified size={33} />}
          bg="bg-[rgb(245,197,37)]"
        />
      </aside>
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
