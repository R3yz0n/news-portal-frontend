import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInOut, fadeInOutHalf } from "../../../animations";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../../store/post/postAction";
import { FaEye } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import DeletePostModal from "./DeletePostModal";

const PostTable = ({ page, searchKeyword }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState(null);
  const { posts, loading, error } = useSelector((state) => state.post);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchKeyword.length > 0)
        dispatch(
          fetchAllPosts({ page: page, size: 10, filter: searchKeyword }),
        );
    }, 1000);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [dispatch, page, searchKeyword, showModal]);

  useEffect(() => {
    if (searchKeyword.length === 0)
      dispatch(fetchAllPosts({ page: page, size: 10, filter: searchKeyword }));
  }, [dispatch, page, searchKeyword, showModal]);

  const handleSelectPost = (id) => {
    setPostId(id);
    setShowModal(true);
  };

  const postColumns = [
    { field: "title", label: "Title" },
    { field: "user", label: "Posted By" },
    { field: "category", label: "Category" },
    { field: "status", label: "Status" },
    { field: "icon", label: "Action", isIcon: true },
  ];
  return (
    <div className="min-w-full">
      <table className="static min-w-full">
        {!loading && (
          <motion.thead
            {...fadeInOutHalf}
            className="  sticky top-0 bg-[rgb(218,221,228)] font-sans text-[17px]  text-gray-800 shadow-md"
          >
            <tr>
              {postColumns?.map((column, index) => (
                <th key={index} className="px-6 py-3 text-left">
                  {column.label}
                </th>
              ))}
            </tr>
          </motion.thead>
        )}
        <tbody className={`scrollbar-track-black  overflow-y-scroll `}>
          {loading ? (
            <motion.tr
              {...fadeInOut}
              className="flex w-full p-2 text-lg text-red-700"
            >
              <td>Loading...</td>
            </motion.tr>
          ) : posts?.length > 0 && error === null ? (
            posts?.map((post, index) => (
              <motion.tr
                {...fadeInOutHalf}
                key={post?.id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="whitespace-nowrap px-6 py-4">{post?.title}</td>
                <td className="whitespace-nowrap px-6 py-4">{post?.author}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {post?.category?.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 capitalize">
                  {post?.status}
                </td>

                <td className="flex h-11 items-center gap-5 pl-8">
                  <Link to={`${post?.id}`}>
                    <FaEdit className="mt-3 cursor-pointer text-xl duration-300 hover:scale-125 hover:text-gray-700 " />
                  </Link>

                  <button onClick={() => handleSelectPost(post.id)}>
                    <MdDelete className="mt-3 cursor-pointer text-xl duration-300 hover:scale-125 hover:text-gray-700 " />
                  </button>

                  <Link to={`/news-details/${post.id}`} target="_blank">
                    <FaEye className="mt-3 cursor-pointer text-xl duration-300 hover:scale-125 hover:text-gray-700 " />
                  </Link>
                </td>
              </motion.tr>
            ))
          ) : (
            <motion.tr
              {...fadeInOut}
              className="flex w-full p-2 text-lg text-red-700"
            >
              <td>{error?.length > 0 ? error : "No Posts Found."}</td>
            </motion.tr>
          )}
        </tbody>
      </table>
      {showModal && (
        <DeletePostModal
          id={postId}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      )}
    </div>
  );
};

export default PostTable;
