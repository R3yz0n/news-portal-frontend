import { useNavigate } from "react-router-dom";
import AddWrapper from "../../common/AddWrapper";
import { isObject, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../common/FormInput";
import SubmitButton from "../../common/SubmitButton";
import { addClient } from "../../../store/client/clientAction";
import { clearFields } from "../../../store/client/ClientSlice";
import { motion } from "framer-motion";
import { fadeInOut } from "../../../animations";
import { clientSchema } from "../../../schema";
import { FaUserFriends } from "react-icons/fa";

const AddClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.client);

  const initialValues = {
    name: "",
    address: "",
    phone_no: "",
  };

  const handleBack = async () => {
    dispatch(clearFields());
    navigate(-1);
  };

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: clientSchema,
      onSubmit: async (values, action) => {
        values.phone_no = values.phone_no.toString();
        console.log(typeof values.phone_no);
        try {
          await dispatch(addClient(values)).unwrap();
          handleBack();
        } catch (err) {
          console.log(err);
        }
      },
    });
  return (
    <AddWrapper
      title="Add Client"
      icon={<FaUserFriends className="text-3xl" />}
      handleBack={handleBack}
    >
      <form onSubmit={handleSubmit}>
        <div className=" grid w-full gap-x-10  gap-y-2 md:grid-cols-2">
          <FormInput
            title="Client name"
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            errors={errors.name}
            touched={touched.name}
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

export default AddClient;
