import { useNavigate, useParams } from "react-router-dom";
import AddWrapper from "../../common/AddWrapper";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../common/FormInput";
import SubmitButton from "../../common/SubmitButton";
import { clearFields } from "../../../store/client/ClientSlice";
import { motion } from "framer-motion";
import { fadeInOut } from "../../../animations";
import { FaUserFriends } from "react-icons/fa";
import AddImage from "../../common/AddImage";
import { useEffect, useState } from "react";
import { editUserById, fetchSingleUser } from "../../../store/user/userAction";
import { editUserSchema } from "../../../schema";

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { error } = useSelector((state) => state.user);
  const [image, setImage] = useState({ data: null, error: null, name: null });

  const initialValues = {
    fullname: "",
    address: "",
    gender: "",
    phone_no: "",
  };

  const handleBack = async () => {
    dispatch(clearFields());
    navigate(-1);
  };

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

  const {
    values,
    errors,
    handleBlur,
    touched,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,  // Use this for specific fields like gender
  } = useFormik({
    initialValues: initialValues,
    validationSchema: editUserSchema,
    onSubmit: async (values) => {
      // Check if the image is provided or already exists
      if (!image.data && !image.name) {
        setImage({ ...image, error: "Please select an image." });
        return;
      }

      // Prepare form data for submission
      values.phone_no = values.phone_no.toString();
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append image only if it's updated or provided
      if (image.data) {
        formData.append("profile_image", image.data);
      }
      console.log(image.data);
      

      try {
        // Dispatch action to edit user by ID
        await dispatch(editUserById({ formData, id })).unwrap();
        handleBack();
      } catch (err) {
        console.error(err);
      }
    },
  });

  useEffect(() => {
    dispatch(clearFields());
    const fetchUser = async () => {
      try {
        const userData = await dispatch(fetchSingleUser(id)).unwrap();
  
        if (userData?.fullname) {
          setValues({
            fullname: userData?.fullname,
            address: userData?.address,
            gender: userData?.gender,
            phone_no: userData?.phone_no,
          });
  
          // Use a functional update for setImage to avoid adding 'image' in the dependency array
          setImage((prevImage) => ({ ...prevImage, name: userData?.profile_image }));
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [dispatch, id, setValues]);

  return (
    <AddWrapper
      title="Edit User"
      icon={<FaUserFriends className="text-3xl" />}
      handleBack={handleBack}
    >
      <form onSubmit={handleSubmit}>
        <div className=" grid w-full gap-x-10  gap-y-2 md:grid-cols-2">
          <FormInput
            title="Full name"
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
            title="Phone number"
            type="number"
            value={values.phone_no}
            onChange={handleChange}
            onBlur={handleBlur}
            name="phone_no"
            errors={errors.phone_no}
            touched={touched.phone_no}
          />

          <aside className="flex items-center gap-5">
            <div className="w-1/2">
              <label className=" text-sm font-semibold uppercase text-gray-700">
                Gender
              </label>
              <div className=" flex h-fit gap-2  font-semibold text-gray-600">
                Male
                <input
                  type="radio"
                  value={"male"}
                  checked={values.gender === "male"}
                  onChange={() => setFieldValue("gender", "male")}
                  onBlur={handleBlur}
                  name="gender"
                />
                Female
                <input
                  type="radio"
                  value={"female"}
                  checked={values.gender === "female"}
                  onChange={() => setFieldValue("gender", "female")}
                  onBlur={handleBlur}
                  name="gender"
                />
              </div>
            </div>
            <div className="-mt-2 min-h-[5px] self-start text-sm text-red-600">
              {errors.gender && touched.gender && (
                <motion.div {...fadeInOut}>{errors.gender}</motion.div>
              )}
            </div>
          </aside>

          {/* Image Upload Component */}
          <AddImage
            handleImageChange={handleImageChange}
            image={image.data}
            error={image.error}
            name={image.name} // Show existing image name if available
            width="w-full lg:w-1/2"
          />
        </div>

        {/* Error Handling */}
        <div className="ml-2 min-h-[5px] self-start text-sm text-red-600">
          {typeof error === "string" && (
            <motion.div {...fadeInOut}>{error}</motion.div>
          )}
          {error && typeof error === "object" &&
            Object.keys(error).map((key) => (
              <div key={key}>{error[key][0]}</div>
            ))}
        </div>

        {/* Submit Button */}
        <SubmitButton value="submit" handleSubmit={handleSubmit} />
      </form>
    </AddWrapper>
  );
};

export default EditUser;
