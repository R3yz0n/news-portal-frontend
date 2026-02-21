import React, { useEffect, useState } from "react";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { btnClick } from "../animations";
import FormInput from "../common/LoginFormInput";
import { loginSchmea } from "../schema";
import axios from "axios";
import { APIURL, IIMAGE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth/authSlice";
import { getCompany } from "../store/company/companyAction";
import { FaEye } from "react-icons/fa";

const initialValues = {
  username: process.env.REACT_APP_ADMIN_USERNAME || "",
  password: process.env.REACT_APP_ADMIN_PASSWORD || "",
};

const Login = () => {
  const { company } = useSelector((state) => state.company);
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate("");
  const [loginState, setLoginState] = useState({
    loading: false,
    error: "",
  });
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const image = company?.fileupload?.name;
  const companyName = company?.name
    ?.split(/\s+/)
    ?.filter((part) => part.trim() !== "");

  const firstName =
    typeof companyName === "string" ? companyName[0] : "Company";
  const secondName = typeof companyName === "string" ? companyName[1] : "Name";

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchmea,
      onSubmit: async (values, action) => {
        setLoginState({ ...loginState, error: "" });
        try {
          console.log(values);
          let res = await axios.post(`${APIURL}/user/login`, values);
          dispatch(login(res.data.data));
        } catch (err) {
          // console.log(err);
          setLoginState({
            ...loginState,
            error: err.response.data.error,
          });
        }
      },
    });

  useEffect(() => {
    if (!company?.name?.length) {
      dispatch(getCompany());
    }

    if (auth.token) {
      navigate("/admin/home", { replace: true });
    }
  }, [auth.token, navigate]);

  return (
    <section className="flex   h-screen w-full  justify-center bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 md:items-center">
      <form
        className="mt-16 flex h-fit w-[360px]  flex-col items-center justify-center md:-mt-10"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 flex w-full flex-col items-center  gap-2 sm:w-[380px]">
          {image ? (
            <img
              src={`${IIMAGE_URL}/${image}`}
              className="h-20 w-20"
              loading="lazy"
              alt="logo"
            />
          ) : (
            <figcaption className=" cursor-pointer rounded-full bg-gray-300 md:h-20 md:w-20"></figcaption>
          )}
          <p className="flex gap-3 text-3xl font-semibold">
            {firstName && (
              <span className="text-logoTextPrimaryColor">{firstName}</span>
            )}
            {secondName && (
              <span className="text-logoTextSecondaryColor">{secondName}</span>
            )}
          </p>
        </div>
        <aside className="w-full rounded-t-lg bg-[#007CAA] px-5 py-3 text-2xl font-bold text-white">
          Login
        </aside>

        <aside className="flex w-full flex-col rounded-b-md bg-gray-100 px-6 py-5 pb-14 shadow-lg">
          <FormInput
            label="Username / Email"
            type="text"
            icon={<FaEnvelope className="text-xl text-gray-800" />}
            value={values.username}
            onChange={handleChange}
            name="username"
            onBlur={handleBlur}
            errors={errors.username}
            touched={touched.username}
          />

          <div className=" relative items-center">
            <FormInput
              label="Password"
              type={showPw ? "text" : "password"}
              icon={<FaLock className="text-xl text-gray-800" />}
              value={values.password}
              onChange={handleChange}
              name="password"
              onBlur={handleBlur}
              errors={errors.password}
              touched={touched.password}
            />
            <FaEye
              className="absolute right-2 top-9 cursor-pointer text-xl   hover:text-blue-500"
              onClick={() => setShowPw(!showPw)}
            />
          </div>

          {loginState.error?.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="-mt-3 ml-1 text-sm text-red-500"
            >
              {loginState.error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loginState.loading}
            className="mt-5 w-full cursor-pointer rounded-md bg-[#62D597] px-4 py-2 text-xl font-bold text-white shadow-lg  transition-all hover:brightness-90"
            {...btnClick}
          >
            Login
          </motion.button>
        </aside>
      </form>
    </section>
  );
};

export default Login;
