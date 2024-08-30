import React, { useState, useEffect } from "react";
import { isObject, useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import AddWrapper from "../../common/AddWrapper";
import FormInput from "../../common/FormInput";
import SubmitButton from "../../common/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import "./ckeditor.css";
import { getPostsById, updatePost } from "../../../store/post/postAction";
import { fetchAllCategories } from "../../../store/category/categoryAction";
import { clearFields } from "../../../store/post/postSlice";
import Dropdown from "../../common/Dropdown";
import { motion } from "framer-motion";
import { fadeInOut } from "../../../animations";
import AddImage from "../../common/AddImage";
import { postSchema } from "../../../schema";
import { FaNewspaper } from "react-icons/fa6";

const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { error } = useSelector((state) => state.post);
  const { categories, error: categoryError } = useSelector(
    (state) => state.category,
  );
  const { userId } = useSelector((state) => state.auth);

  const initialValues = {
    title: "",
    author: "",
    category_id: "",
    is_mukhya_samachar: 0,
    body: "",
  };

  const [image, setImage] = useState({ data: null, error: null, name: null });

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

  const handleBack = async () => {
    dispatch(clearFields());
    navigate(-1);
  };

  const editorConfiguration = {
    contentsCss: ["./ckeditor.css"],
  };

  const {
    values,
    errors,
    handleBlur,
    touched,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: postSchema,
    onSubmit: async (values, action) => {
      if (!image.data && !image.name) {
        setImage({
          ...image,
          error: "Image is required.",
        });
        return;
      }
      // console.log(values);
      values.user_id = userId;
      values.featured_image = image.data;
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      try {
        await dispatch(updatePost({ formData, id })).unwrap();
        handleBack();
      } catch (err) {}
    },
  });

  useEffect(() => {
    dispatch(clearFields());
    dispatch(fetchAllCategories());
    const fetchPostById = async () => {
      try {
        const postData = await dispatch(getPostsById(id)).unwrap();
        if (postData?.title) {
          setValues({
            ...values,
            title: postData?.title,
            author: postData.author,
            body: postData?.body,
            category_id: postData.category_id,
            is_mukhya_samachar: postData.is_mukhya_samachar,
          });
          // console.log(postData);
          setImage({ ...image, name: postData?.featured_image?.name });
        }
      } catch (error) {
        // console.error("Error fetching advertisement:", error);
      }
    };
    fetchPostById();
  }, [dispatch, id]);
  return (
    <AddWrapper
      title="Edit Post"
      icon={<FaNewspaper className="text-[28px]" />}
      handleBack={handleBack}
    >
      <form onSubmit={handleSubmit}>
        <div className=" grid w-full gap-x-10  gap-y-2 md:grid-cols-2">
          <FormInput
            title="Post title"
            type="text"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            name="title"
            errors={errors.title}
            touched={touched.title}
          />
          <FormInput
            title="Author name"
            type="text"
            value={values.author}
            onChange={handleChange}
            onBlur={handleBlur}
            name="author"
            errors={errors.author}
            touched={touched.author}
          />

          <Dropdown
            categories={categories}
            onChange={handleChange}
            errors={errors.category_id}
            touched={touched.category_id}
            categoryError={categoryError}
            value={values.category_id}
            name="category_id"
          />

          <aside className="flex flex-col gap-3">
            <label className=" text-sm font-semibold uppercase text-gray-700">
              Is mukhya samachar
            </label>
            <div className=" flex h-fit gap-2  font-semibold text-gray-600">
              Yes
              <input
                type="radio"
                value={"1"}
                checked={values.is_mukhya_samachar.toString() === "1"}
                onChange={handleChange}
                onBlur={handleBlur}
                name="is_mukhya_samachar"
              />
              No
              <input
                type="radio"
                value={"0"}
                checked={values.is_mukhya_samachar.toString() === "0"}
                onChange={handleChange}
                onBlur={handleBlur}
                name="is_mukhya_samachar"
              />
            </div>
            <div className="-mt-2 min-h-[5px] self-start text-sm text-red-600">
              {errors.is_mukhya_samachar && touched.is_mukhya_samachar && (
                <motion.div {...fadeInOut}>
                  {errors.is_mukhya_samachar}
                </motion.div>
              )}
            </div>
          </aside>
        </div>
        <div className="mt-4">
          <label className="text-sm font-semibold uppercase text-gray-700">
            Post Description
          </label>
          <CKEditor
            editor={Editor}
            config={editorConfiguration}
            data={values.body}
            onChange={(event, editor) => {
              const datas = editor.getData();

              setFieldValue("body", datas);
            }}
          />
          <div className="ml-2 min-h-[5px] self-start text-sm text-red-600">
            {errors.body && touched.body && (
              <motion.div {...fadeInOut}>{errors.body}</motion.div>
            )}
          </div>
        </div>

        <AddImage
          handleImageChange={handleImageChange}
          image={image.data}
          error={image.error}
          name={image.name}
          width="w-full  md:w-1/2"
        />

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

export default EditPost;
