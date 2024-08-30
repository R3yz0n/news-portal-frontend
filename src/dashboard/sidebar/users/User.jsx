import React, { useState } from "react";
import UserTable from "./UserTable";
import TableWrapper from "../../common/TableWrapper";
import { FaUserFriends } from "react-icons/fa";
import { useSelector } from "react-redux";

const User = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const { total } = useSelector((state) => state.user);
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
      link="/admin/user/add"
      title="Users"
      icon={<FaUserFriends className="text-3xl" />}
      page={page}
      handleSearch={handleSearch}
      handleNextPage={handleNextPage}
      handlePrevPage={handlePrevPage}
      handleResetPage={handleResetPage}
      total={total}
      paginate={true}
    >
      <UserTable page={page} searchKeyword={searchKeyword} />
    </TableWrapper>
  );
};

export default User;
