import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./landingPage/LandingPage";
import Dashboard from "./dashboard/components/Dashboard";
import Login from "./login/Login";
import { fetchAllCategories } from "./store/category/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import PreLoader from "./common/PreLoader";
import { getPostsForHomePage } from "./store/post/postAction";
import ProtectedRoute from "./common/ProtectedRoute";
import NotFoundPage from "./common/NotFoundPage";

function App() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.category);
  const { isWait, error: postError } = useSelector((state) => state.post);
  const [showLoader, setShowLoader] = useState(true);
  const location = useLocation();
console.log(process.env)
  const fetchData = async () => {
    try {
      await dispatch(fetchAllCategories()).unwrap();
      await dispatch(getPostsForHomePage()).unwrap();

      const timeoutId = setTimeout(() => {
        setShowLoader(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    } catch (error) {
      console.error("Error fetching data:", error);
      setShowLoader(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const routeToExclude = location.pathname?.includes("/admin");

  if (!routeToExclude && (showLoader || loading || isWait)) {
    return <PreLoader />;
  }

  if (!routeToExclude && (error || postError)) {
    return (
      <NotFoundPage
        fullPage={true}
        title="Oops! Something went wrong"
        message="We'll be back online soon. Stay patient and stay tuned! "
      />
    );
  }

  return (
    <>
      <Routes>
        <Route path="/*" element={<LandingPage />} />
        <Route
          path="admin/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
