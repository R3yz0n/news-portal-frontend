import React, { useEffect, useState } from "react";
import AddWrapper from "../../common/AddWrapper";
import { clearFields } from "../../../store/advertises/advertisesSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiFileInfoFill } from "react-icons/ri";
import SubmitButton from "../../common/SubmitButton";
import { isObject, useFormik } from "formik";
import { motion } from "framer-motion";
import { fadeInOut } from "../../../animations";
import { advertisesEditSchema } from "../../../schema";
import AddImage from "../../common/AddImage";
import {
  getAdvertiseById,
  updateAdvertises,
} from "../../../store/advertises/advertisesAction";
import FormInput from "../../common/FormInput";

const EditAdvertises = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [image, setImage] = useState({ data: null, error: null, name: null });
  const { error } = useSelector((state) => state.advertises);

  const handleImageChange = (selectedImage) => {
    if (selectedImage === "DELETE_IMAGE") {
      setImage({
        ...image,
        data: null,
      });

      return;
    }
    if (selectedImage === "A") {
      setImage({
        ...image,
        name: null,
      });
      return;
    }
    setImage({
      ...image,
      data: selectedImage,
      error: null,
    });
  };

  const initialValues = {
    name: "",
    description: "",
  };
  const handleBack = () => {
    dispatch(clearFields());

    navigate(-1);
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
    validationSchema: advertisesEditSchema,
    onSubmit: async (values, action) => {
      if (!image.data && !image.name) {
        setImage({
          ...image,
          error: "Image is required.",
        });
        return;
      }
      console.log(values);
      values.image = image.data;
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      try {
        await dispatch(updateAdvertises({ formData, id })).unwrap();
        handleBack();
      } catch (err) {}
    },
  });
  useEffect(() => {
    const fetchAdvertises = async () => {
      try {
        const advertisesData = await dispatch(getAdvertiseById(id)).unwrap();
        if (advertisesData?.name) {
          setValues({
            ...values,
            name: advertisesData?.name,
            description: advertisesData?.description,
          });
          setImage({ ...image, name: advertisesData?.image });
        }
      } catch (error) {
        // console.error("Error fetching advertisement:", error);
      }
    };
    fetchAdvertises();
  }, [dispatch, id]);

  return (
    <AddWrapper
      handleBack={handleBack}
      title="Edit Advertise"
      icon={<RiFileInfoFill className="text-3xl" />}
    >
      <form onSubmit={handleSubmit}>
        <FormInput
          title="Advertises Name"
          type="text"
          value={values.name}
          onChange={handleChange}
          name="name"
          onBlur={handleBlur}
          errors={errors.name}
          touched={touched.name}
        />
        <aside className="flex gap-10">
          <FormInput
            title="Description"
            type="textarea"
            value={values.description}
            onChange={handleChange}
            name="description"
            onBlur={handleBlur}
            errors={errors.description}
            touched={touched.description}
          />
          <AddImage
            handleImageChange={handleImageChange}
            image={image.data}
            error={image.error}
            name={image.name}
            width="w-full"
          />
        </aside>

        <div className="ml-2 min-h-[5px] self-start text-sm text-red-600">
          {typeof error === "string" && (
            <motion.div {...fadeInOut}>{error}</motion.div>
          )}
          {isObject(error) &&
            Object.keys(error).map((key) => (
              <div key={key}>{error[key][0]}</div>
            ))}
        </div>
        <SubmitButton value="update" handleSubmit={handleSubmit} />
      </form>
    </AddWrapper>
  );
};

export default EditAdvertises;
