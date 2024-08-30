// ProtectedRoute.js
import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/auth/authSlice";
import toast from "react-hot-toast";
import { clearAdvertisementData } from "../store/advertisement/advertisementSlice";
import { clearUserData } from "../store/user/userSlice";
import { clearAdvertisesData } from "../store/advertises/advertisesSlice";
import { clearClientData } from "../store/client/ClientSlice";
import { clearTransactionData } from "../store/transaction/transactionSlice";
import { clearCompanyData } from "../store/company/companySlice";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      toast.error("Session expired, please login again", { duration: 3000 });
      navigate("/login", { replace: true });
    }

    if (isTokenExpired(token)) {
      dispatch(logout());

      dispatch(clearAdvertisementData());
      dispatch(clearUserData());
      dispatch(clearAdvertisesData());
      dispatch(clearClientData());
      dispatch(clearTransactionData());
      dispatch(clearCompanyData());
    }
  }, [token, navigate, dispatch]);

  return <>{children}</>;
};

export default ProtectedRoute;

const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds

    return decodedToken.exp < currentTime;
  } catch (error) {
    // Token is invalid or cannot be decoded
    return true;
  }
};
