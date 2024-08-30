import { useNavigate } from "react-router-dom";
import AddWrapper from "../../common/AddWrapper";
import { isObject, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../common/FormInput";
import SubmitButton from "../../common/SubmitButton";
import { motion } from "framer-motion";
import { fadeInOut } from "../../../animations";
import { categorySchema } from "../../../schema";
import { addCategory } from "../../../store/category/categoryAction";
import { clearFields } from "../../../store/category/categorySlice";
import { BiSolidCategory } from "react-icons/bi";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.category);

  const initialValues = {
    name: "",
  };

  const handleBack = async () => {
    dispatch(clearFields());
    navigate(-1);
  };

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: categorySchema,
      onSubmit: async (values) => {
        try {
          await dispatch(addCategory(values)).unwrap();
          handleBack();
        } catch (err) {
          console.log(err);
        }
      },
    });
  return (
    <AddWrapper
      title="Add Category"
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
        <SubmitButton value="submit" handleSubmit={handleSubmit} />
      </form>
    </AddWrapper>
  );
};

export default AddCategory;
