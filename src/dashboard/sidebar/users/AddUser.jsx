import { useNavigate } from "react-router-dom";
import AddWrapper from "../../common/AddWrapper";
import { isObject, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../common/FormInput";
import SubmitButton from "../../common/SubmitButton";
import { clearFields } from "../../../store/client/ClientSlice";
import { motion } from "framer-motion";
import { fadeInOut } from "../../../animations";
import { FaUserFriends } from "react-icons/fa";
import { useState } from "react";
import { addUser } from "../../../store/user/userAction";
import { IoEye } from "react-icons/io5";
import { addUserSchema } from "../../../schema";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.user);
  const [image, setImage] = useState({ data: null, error: null });
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    fullname: "",
    username: "",
    address: "",
    gender: "",
    phone_no: "",
    password: "",
  };

  const handleBack = async () => {
    dispatch(clearFields());
    navigate(-1);
  };

  const handleImageChange = (selectedImage) => {
    // if (selectedImage === "DELETE_IMAGE") {
    //   setImage({
    //     ...image,
    //     data: null,
    //   });
    //   return;
    // }
    // setImage({
    //   ...image,
    //   data: selectedImage,
    //   error: null,
    // });
  };

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: addUserSchema,
      onSubmit: async (values) => {
        // if (image.data === null) {
        //   setImage({ ...image, error: "Please select an image." });
        //   return;
        // }
        values.phone_no = values.phone_no.toString();
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });
        // formData.append("profile_image", image.data);

        try {
          await dispatch(addUser(formData)).unwrap();
          handleBack();
        } catch (err) {
          console.log(err);
        }
      },
    });
  return (
    <AddWrapper
      title="Add User"
      icon={<FaUserFriends className="text-3xl" />}
      handleBack={handleBack}
    >
      <form onSubmit={handleSubmit}>
        <div className=" grid w-full gap-x-10  gap-y-2 md:grid-cols-2">
          <FormInput
            title="full name"
            type="text"
            value={values.fullname}
            onChange={handleChange}
            onBlur={handleBlur}
            name="fullname"
            errors={errors.fullname}
            touched={touched.fullname}
          />
          <FormInput
            title="Address"
            type="text"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            name="address"
            errors={errors.address}
            touched={touched.address}
          />
          <FormInput
            title="username"
            type="text"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            name="username"
            errors={errors.username}
            touched={touched.username}
          />

          <aside className="flex items-center  gap-2">
            <FormInput
              title="password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              errors={errors.password}
              touched={touched.password}
            />
            <IoEye
              className="mt-4 cursor-pointer text-3xl hover:text-blue-500"
              onClick={() => setShowPassword(!showPassword)}
            />
          </aside>

          <FormInput
            title="Phone number"
            type="number"
            value={values.phone_no}
            onChange={handleChange}
            onBlur={handleBlur}
            name="phone_no"
            errors={errors.phone_no}
            touched={touched.phone_no}
          />

          <aside className="flex flex-col gap-3">
            <label className=" text-sm font-semibold uppercase text-gray-700">
              Gender
            </label>
            <div className=" flex h-fit gap-2  font-semibold text-gray-600">
              Male
              <input
                type="radio"
                value={"male"}
                checked={values.gender === "male"}
                onChange={handleChange}
                onBlur={handleBlur}
                name="gender"
              />
              Female
              <input
                type="radio"
                value={"female"}
                checked={values.gender === "female"}
                onChange={handleChange}
                onBlur={handleBlur}
                name="gender"
              />
            </div>
            <div className="-mt-2 min-h-[5px] self-start text-sm text-red-600">
              {errors.gender && touched.gender && (
                <motion.div {...fadeInOut}>{errors.gender}</motion.div>
              )}
            </div>
          </aside>
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
        <SubmitButton
          value={loading ? "Submitting..." : "Submit"}
          disabled={loading}
          handleSubmit={handleSubmit}
        />
      </form>
    </AddWrapper>
  );
};

export default AddUser;
