import { useNavigate, useParams } from "react-router-dom";
import AddWrapper from "../../common/AddWrapper";
import { isObject, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../common/FormInput";
import SubmitButton from "../../common/SubmitButton";
import { motion } from "framer-motion";
import { fadeInOut } from "../../../animations";
import { categorySchema } from "../../../schema";
import {
  editCategoryById,
  fetchSingleCategory,
} from "../../../store/category/categoryAction";
import { clearFields } from "../../../store/category/categorySlice";
import { BiSolidCategory } from "react-icons/bi";
import { useEffect } from "react";

const EditCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.category);
  const { id } = useParams();

  const initialValues = {
    name: "",
  };

  const handleBack = async () => {
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
    validationSchema: categorySchema,
    onSubmit: async (values) => {
      // debugger;
      try {
        const categoryToBeEdited = {
          id: id,
          name: values,
        };
        await dispatch(editCategoryById(categoryToBeEdited)).unwrap();
        handleBack();
      } catch (err) {}
    },
  });

  useEffect(() => {
    const fetchAdvertises = async () => {
      try {
        const categoryData = await dispatch(fetchSingleCategory(id)).unwrap();
        if (categoryData?.name) {
          setValues({
            ...values,
            name: categoryData?.name,
          });
        }
      } catch (error) {}
    };
    if (id) {
      fetchAdvertises();
    }
  }, [dispatch, id]);
  console.log(id);

  return (
    <AddWrapper
      title="Edit Category"
      icon={<BiSolidCategory className="text-3xl" />}
      handleBack={handleBack}
    >
      <form onSubmit={handleSubmit}>
        <div className=" grid w-full gap-x-10  gap-y-2 md:grid-cols-2">
          <FormInput
            title="category name"
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            errors={errors.name}
            touched={touched.name}
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
        <SubmitButton
          value={loading ? "Submitting..." : "Submit"}
          disabled={loading}
          handleSubmit={handleSubmit}
        />
      </form>
    </AddWrapper>
  );
};

export default EditCategory;
