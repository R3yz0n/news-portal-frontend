import React from "react";
import DBLeft from "./DBLeft";
import DBRight from "./DBRight";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === "/admin") {
      navigate("/admin/home");
    }
  }, [navigate]);
  return (
    <div className="flex h-screen min-h-screen w-screen bg-[rgb(55,65,81)]">
      <DBLeft />
      <DBRight />
    </div>
  );
};

export default Dashboard;
