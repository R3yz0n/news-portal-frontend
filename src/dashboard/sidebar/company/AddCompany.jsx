import React, { useState, useEffect } from "react";
import { Formik, isObject } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCompany,
  getCompany,
  updateCompany,
} from "../../../store/company/companyAction";
import { clearFields } from "../../../store/company/companySlice";
import { companySchema } from "../../../schema";
import AddWrapper from "../../common/AddWrapper";
import FormInput from "../../common/FormInput";
import SubmitButton from "../../common/SubmitButton";
import SocialLinksInput from "./SocialLinksInput";
import { BiSolidBuildings } from "react-icons/bi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import "../posts/ckeditor.css";
import AddImage from "../../common/AddImage";
import { motion } from "framer-motion";
import { fadeInOut } from "../../../animations";

const AddCompany = () => {
  const [ckdata, setCKData] = useState("");
  const [ckError, setCkError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [socialLinks, setSocialLinks] = useState([
    { name: "", social_media_link: "" },
  ]);
  const [socialLinksError, setSocialLinksError] = useState(null);
  const [image, setImage] = useState({ data: null, error: null, name: null });
  const { company, error, loading } = useSelector((state) => state.company);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const companyData = await dispatch(getCompany()).unwrap();

        if (companyData) {
          setSocialLinks([...companyData?.social_media]);
          setCKData(companyData?.company_description);
          setImage({ ...image, name: companyData?.fileupload?.name });
        }
      } catch (error) {}
    };
    fetchCompany();
  }, [dispatch]);

  const initialValues = {
    name: company?.name || "",
    slogan: company?.slogan || "",
    email: company?.email || "",
    phone_no: company?.phone_no || "",
    external_phoneno: company?.external_phoneno || "",
    reporter: company?.reporter || "",
    pradhan_sanchalak: company?.pradhan_sanchalak || "",
    sanchalak: company?.sanchalak || "",
    salahakar: company?.salahakar || "",
    ji_pra_ka_ru_d_no: company?.ji_pra_ka_ru_d_no || "",
    press_council_registration_no: company?.press_council_registration_no || "",
    local_pra_registration_no: company?.local_pra_registration_no || "",
    media_biva_registration_cretificate_no:
      company?.media_biva_registration_cretificate_no || "",
    privacypolicy: company?.privacypolicy || "",
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

  const excludedKeys = ["company_description", "image", "social_Media"];

  const addSocialLinks = (links) => {
    setSocialLinks(links);
  };

  const onSubmit = async (values) => {
    if (!image.data && !image.name) {
      setImage({
        ...image,
        error: "Image is required.",
      });
      return;
    }
    const nonEmptyLinks = socialLinks.filter(
      (link) => link.name.trim() !== "" || link.social_media_link.trim() !== "",
    );
    if (!nonEmptyLinks.length) {
      setSocialLinksError("This field is required.");
      return;
    }
    setCkError(null);
    if (!ckdata.trim().length) {
      setCkError("Post description is required.");
      return;
    }
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("social_media", JSON.stringify(socialLinks));
    formData.append("logo", image.data);
    formData.append("company_description", ckdata);
    let item = {
      id: company?.id,
      formData: formData,
    };

    if (company) {
      try {
        await dispatch(updateCompany(item)).unwrap();
        dispatch(clearFields());
      } catch (err) {}
    } else {
      try {
        await dispatch(addCompany(formData)).unwrap();
        dispatch(clearFields());
      } catch (err) {}
    }
  };
  const handleBack = async () => {
    dispatch(clearFields());
    navigate(-1);
  };

  const editorConfiguration = {
    // ... other configurations
    contentsCss: ["../posts/ckeditor.css"],
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={companySchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <AddWrapper
            title="Company"
            icon={<BiSolidBuildings className="text-3xl" />}
            handleBack={handleBack}
          >
            <form className="w-full bg-transparent " onSubmit={handleSubmit}>
              <div className="grid gap-x-4 gap-y-0 md:grid-cols-2 lg:gap-x-10 ">
                {Object.keys(initialValues)
                  .filter((key) => !excludedKeys.includes(key))
                  .map((key) => (
                    <FormInput
                      key={key}
                      title={key.replace(/_/g, " ")}
                      type="text"
                      value={values[key]}
                      onChange={handleChange}
                      name={key}
                      onBlur={handleBlur}
                      errors={errors[key]}
                      touched={touched[key]}
                    />
                  ))}

                <AddImage
                  handleImageChange={handleImageChange}
                  image={image.data}
                  error={image.error}
                  name={image.name}
                  width="w-1/2"
                />

                <SocialLinksInput
                  socialLinks={socialLinks}
                  addSocialLinks={addSocialLinks}
                  errors={socialLinksError}
                />
              </div>
              <div className="mt-4 ">
                <label className="text-sm font-semibold uppercase text-gray-700 ">
                  Company Description
                </label>
                <CKEditor
                  editor={Editor}
                  config={editorConfiguration}
                  data={ckdata}
                  onChange={(event, editor) => {
                    const datas = editor.getData() || "";
                    setCKData(datas);
                  }}
                />
                <div className="ml-2 min-h-[5px] self-start text-sm text-red-600">
                  {ckError && <motion.div {...fadeInOut}>{ckError}</motion.div>}
                </div>
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
              />
            </form>
          </AddWrapper>
        )}
      </Formik>
    </>
  );
};

export default AddCompany;
