import React, { useState } from "react";
import PostTable from "./PostTable";
import TableWrapper from "../../common/TableWrapper";
import { FaNewspaper } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Post = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const { total } = useSelector((state) => state.post);
  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };
  const [page, setPage] = useState(0);
  const handleNextPage = () => {
    if (total / 10 < page + 1) return;
    setPage(page + 1);
  };
  const handlePrevPage = () => {
    if (page === 0) return;
    setPage(page - 1);
  };
  const handleResetPage = () => {
    setPage(0);
  };
  return (
    <TableWrapper
      handleResetPage={handleResetPage}
      link="/admin/post/add"
      title="Posts"
      icon={<FaNewspaper className="text-3xl" />}
      page={page}
      handleSearch={handleSearch}
      handleNextPage={handleNextPage}
      handlePrevPage={handlePrevPage}
      total={total}
      paginate={true}
    >
      <PostTable page={page} searchKeyword={searchKeyword} />
    </TableWrapper>
  );
};

export default Post;
