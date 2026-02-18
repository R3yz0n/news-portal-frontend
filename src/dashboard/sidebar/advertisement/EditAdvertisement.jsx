import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AddWrapper from "../../common/AddWrapper";
import { useDispatch, useSelector } from "react-redux";

import { FaAdversal } from "react-icons/fa6";
import FormInput from "../../common/FormInput";
import { isObject, useFormik } from "formik";
import { motion } from "framer-motion";
import { fadeInOut } from "../../../animations";
import SubmitButton from "../../common/SubmitButton";
import {
  getAdvertisementById,
  updateAdvertisement,
} from "../../../store/advertisement/advertisementAction";
import { clearFields } from "../../../store/advertisement/advertisementSlice";

const EditAdvertisement = () => {
  const initialValues = {
    type: "",
    rate: "0",
  };
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, advertisementById, advertisements, loading } = useSelector(
    (state) => state.advertisement,
  );
  const handleBack = () => {
    navigate(-1);
    dispatch(clearFields());
  };

  const {
    values,
    errors,
    handleBlur,
    touched,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, action) => {
      const rate = values.rate;
      await dispatch(updateAdvertisement({ rate, id })).unwrap();
      handleBack();
    },
  });

  useEffect(() => {
    const fetchAdvertisement = async () => {
      try {
        const { rate } = await dispatch(getAdvertisementById(id)).unwrap();
        setValues({
          ...values,
          rate: parseFloat(rate),
        });
      } catch (error) {
        // console.error("Error fetching advertisement:", error);
      }
    };

    const findAds = advertisements?.find((ads) => ads.id === parseInt(id));
    if (isObject(findAds)) {
      setValues({
        type: findAds.type,
        rate: findAds.rate,
      });
    } else {
      fetchAdvertisement();
    }
  }, [dispatch, id]);

  return (
    <AddWrapper
      title="Edit Advertisement"
      handleBack={handleBack}
      icon={<FaAdversal className="text-3xl" />}
    >
      <form onSubmit={handleSubmit}>
        <section className="grid gap-x-4 gap-y-0 md:grid-cols-2 lg:gap-x-10">
          <motion.div className="max-w-1/2 w-full  py-1 " {...fadeInOut}>
            <label
              htmlFor=""
              className="text-sm font-semibold uppercase text-gray-700"
            >
              ADVERTISEMENT TYPE
            </label>

            <div className="h-9 w-full rounded-md border border-gray-400 bg-transparent bg-white px-4   py-1.5 text-base font-medium  text-gray-700 shadow-sm  shadow-gray-200 focus:border-red-600 focus:outline-none">
              {values?.type || advertisementById?.type}
            </div>
          </motion.div>
          <FormInput
            title="Rate / Month in Rs."
            type="number"
            value={values.rate}
            onChange={handleChange}
            name="rate"
            onBlur={handleBlur}
            errors={errors.rate}
            touched={touched.rate}
          />
        </section>

        <motion.p
          {...fadeInOut}
          className="flex w-full p-2 text-lg text-red-700"
        >
          <span>{error?.length > 0 && error}</span>
        </motion.p>

        <SubmitButton
          value={loading ? "Updating..." : "Update"}
          disabled={loading}
        />
      </form>
    </AddWrapper>
  );
};

export default EditAdvertisement;
