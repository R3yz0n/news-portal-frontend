import React, { useEffect, useState } from "react";
import AddWrapper from "../../common/AddWrapper";
import { RiFileInfoFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import FormInput from "../../common/FormInput";
import { isObject, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAdvertisement } from "../../../store/advertisement/advertisementAction";
import Select from "react-select";
import { motion } from "framer-motion";
import { fadeInOut } from "../../../animations";
import AdvertisementSelectionDropdown from "./AdvertisementSelectionDropdown";
import MonthSelectionDropDown from "./MonthSelectionDropdown";

import SubmitButton from "../../common/SubmitButton";
import { advertisesSchema } from "../../../schema";
import AdvertisementSummary from "./AdvertisementSummary";
import {
  fetchAllClients,
  fetchClientList,
} from "../../../store/client/clientAction";
import AddImage from "../../common/AddImage";
import { createAnAdvertises } from "../../../store/advertises/advertisesAction";
import { addMonths, format } from "date-fns";
import toast from "react-hot-toast";
import { clearFields } from "../../../store/advertises/advertisesSlice";
import { fetchAllCategories } from "../../../store/category/categoryAction";

const AddAdvertises = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { advertisements, error: advertisementError } = useSelector(
    (state) => state.advertisement,
  );
  const { clientList } = useSelector((state) => state.client);
  const [image, setImage] = useState({ data: null, error: null });
  const [categorySelect, setCategorySelect] = useState(null);
  const { error } = useSelector((state) => state.advertises);
  const { categories, error: categoryError } = useSelector(
    (state) => state.category,
  );
  const months = [...Array(12)].map((_, i) => {
    return { month: i + 1, id: i + 1 };
  });

  const handleImageChange = (selectedImage) => {
    if (selectedImage === "DELETE_IMAGE") {
      setImage({
        ...image,
        data: null,
      });
      return;
    }
    setImage({
      ...image,
      data: selectedImage,
      error: null,
    });
  };
  const handleBack = () => {
    dispatch(clearFields());

    navigate(-1);
  };

  const clientOptions = [
    ...clientList.map((client) => ({
      value: client.id,
      label: `${client.name} (${client.phone_no})`,
    })),
  ];

  const initialValues = {
    name: "",
    description: "",
    advertisement: "",
    start_date: "",
    month: "1",
    discount: 0,
    client: "",
    paid_amount: 0,
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
    validationSchema: advertisesSchema,
    onSubmit: async (values, action) => {
      // console.log(typeof values.discount);
      if (image.data === null) {
        setImage({ ...image, error: "Please select an image" });
        return;
      }
      // console.log(categorySelect);
      // console.log(values.advertisement);

      if (Number(values.advertisement) === 6 && categorySelect === null) {
        toast.error("Please select a category for this advertisement", {
          duration: 3000,
        });
        return;
      }
      if (Number(values.advertisement) !== 6) {
        delete values.where_to_display;
      }
      if (Number(values.advertisement) === 6) {
        values.where_to_display = categorySelect;
      }
      if (values.discount.length === "") values.discount = 0;
      else values.discount = parseInt(values.discount);

      //converted months to end date
      const startDateObject = new Date(values.start_date);
      const endDateObject = addMonths(startDateObject, parseInt(values.month));
      const formattedEndDate = format(endDateObject, "yyyy-MM-dd");
      values.end_date = formattedEndDate;
      //appended image
      values.image = image.data;

      //append advertisement_id
      values.advertisement_id = +values.advertisement;

      const advertisementRate = advertisements.find(
        (advertisement) => advertisement.id === values.advertisement_id,
      ).rate;

      if (values.discount >= advertisementRate * Number(values.month)) {
        toast.error("Discount amount cannot be greater than total amount.", {
          duration: 3000,
        });
        return;
      }
      if (
        values.paid_amount >
        advertisementRate * Number(values.month) - values.discount
      ) {
        toast.error("Paying amount cannot be greater than total  amount.", {
          duration: 3000,
        });
        return;
      }

      values.client_id = +values.client;
      values.paid_amount = +values.paid_amount;

      //remove unused fields

      const { advertisement, client, month, ...requiredData } = values;
      const formData = new FormData();
      Object.keys(requiredData).forEach((key) => {
        formData.append(key, requiredData[key]);
      });

      try {
        await dispatch(createAnAdvertises(formData)).unwrap();
        handleBack();
      } catch (err) {
        // console.log(err);
      }
    },
  });

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(clearFields());
    dispatch(fetchClientList());
    dispatch(fetchAllAdvertisement());
  }, [dispatch]);

  return (
    <AddWrapper
      icon={<RiFileInfoFill className="text-3xl" />}
      title="Add Advertise "
      handleBack={handleBack}
    >
      <form onSubmit={handleSubmit}>
        <div className=" grid w-full gap-x-10  gap-y-2 md:grid-cols-2">
          <motion.aside className="  flex flex-col gap-1 py-1" {...fadeInOut}>
            <label
              htmlFor=""
              className="  text-sm font-semibold uppercase text-gray-700"
            >
              Select a Client
            </label>
            <Select
              className="w-full rounded-md"
              options={clientOptions}
              onChange={(selectedOption) =>
                setValues({ ...values, client: selectedOption.value })
              }
              onBlur={handleBlur}
              placeholder="Clients name with phone no."
            />
            <div className="ml-2 min-h-[5px] self-start text-sm text-red-600">
              {errors.client && touched.client && (
                <motion.div {...fadeInOut}>{errors.client}</motion.div>
              )}
            </div>
          </motion.aside>

          <FormInput
            title="advertises name"
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            errors={errors.name}
            touched={touched.name}
          />

          <aside className="grid lg:grid-cols-2 lg:gap-[10%]">
            <AdvertisementSelectionDropdown
              advertisementError={advertisementError}
              advertisements={advertisements}
              onChange={handleChange}
              errors={errors.advertisement}
              touched={touched.advertisement}
              name="advertisement"
              setCategorySelect={setCategorySelect}
            />

            {Number(values.advertisement) === 6 && (
              <div>
                <label className="font-semibold text-gray-700">
                  Select category
                </label>
                <select
                  className="my-auto h-fit w-full  rounded px-4 py-2"
                  onChange={(e) => setCategorySelect(e.target.value)}
                >
                  <option hidden>Select Category</option>
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="py-1">
              <label className="block text-sm font-semibold uppercase text-gray-700">
                From Date
              </label>

              <motion.input
                {...fadeInOut}
                value={values.start_date}
                onChange={handleChange}
                name="start_date"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                className=" mt-1 cursor-pointer rounded-md border border-gray-300  px-3 py-1.5  focus:border-blue-500 focus:outline-none"
              />
              <div className="ml-2 min-h-[5px] self-start text-sm text-red-600">
                {errors.start_date && touched.start_date && (
                  <motion.div {...fadeInOut}>{errors.start_date}</motion.div>
                )}
              </div>
            </div>
          </aside>

          <aside className="flex flex-col lg:flex-row lg:gap-8">
            <MonthSelectionDropDown
              months={months}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.month}
              touched={touched.month}
              name="month"
            />
            <FormInput
              title="Discount amount"
              type="number"
              value={values.discount}
              onChange={handleChange}
              onBlur={handleBlur}
              name="discount"
              errors={errors.discount}
              touched={touched.discount}
            />
            <FormInput
              title="Pay amount"
              type="number"
              value={values.paid_amount}
              onChange={handleChange}
              onBlur={handleBlur}
              name="paid_amount"
              errors={errors.paid_amount}
              touched={touched.paid_amount}
            />
          </aside>

          <FormInput
            type="textarea"
            touched={touched.description}
            name="description"
            rows={6}
            value={values.description}
            errors={errors.description}
            onChange={handleChange}
            onBlur={handleBlur}
            title="Advertisement Description"
          />
          <AdvertisementSummary
            start_date={values.start_date}
            month={values.month}
            discount={values.discount}
            advertisement={values.advertisement}
            advertisements={advertisements}
            paid_amount={values.paid_amount}
          />
          <AddImage
            handleImageChange={handleImageChange}
            image={image.data}
            width={"w-full"}
            error={image.error}
          />
        </div>

        <div className="ml-2 min-h-[5px] self-start text-sm text-red-600">
          {typeof error === "string" && (
            <motion.div {...fadeInOut}>{error}</motion.div>
          )}
          {isObject(error) &&
            Object.keys(error).map((key) => (
              <div key={key}>{error[key][0]}</div>
            ))}
        </div>
        <SubmitButton value="submit" handleSubmit={handleSubmit} />
      </form>
    </AddWrapper>
  );
};

export default AddAdvertises;
