import { motion } from "framer-motion";
import React from "react";
import { btnClick, fadeInOut } from "../../../animations";
import { useDispatch, useSelector } from "react-redux";
import { deletePostById } from "../../../store/post/postAction";
import { clearFields } from "../../../store/post/postSlice";

const DeletePostModal = ({ setShowModal, id, showModal }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.post);
  const handlePostDelete = async (id) => {
    try {
      await dispatch(deletePostById(id)).unwrap();

      dispatch(clearFields());
      setShowModal(!showModal);
    } catch (err) {}
  };

  return (
    <main className="fixed left-0 top-0 flex h-screen w-screen items-center  justify-center bg-black bg-opacity-80">
      <div className="h-auto rounded-md bg-gray-100 px-10 py-12 md:w-1/3">
        <h1 className="text-center font-semibold">
          Are you sure want to delete?
        </h1>
        <div className="ml-2 min-h-[5px] self-start text-center text-sm text-red-600">
          {error && <motion.div {...fadeInOut}>{error}</motion.div>}
        </div>
        <div className="mt-3 flex justify-center gap-4">
          <motion.button
            {...btnClick}
            className="rounded bg-red-500 px-5 py-0.5 text-white"
            onClick={() => handlePostDelete(id)}
          >
            Yes
          </motion.button>
          <motion.button
            {...btnClick}
            onClick={() => setShowModal(!showModal)}
            className="rounded bg-blue-500 px-5 py-0.5 text-white"
          >
            No
          </motion.button>
        </div>
      </div>
    </main>
  );
};

export default DeletePostModal;
