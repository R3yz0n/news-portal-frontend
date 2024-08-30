import React, { useState } from "react";
import ClientTable from "./ClientTable";
import TableWrapper from "../../common/TableWrapper";
import { FaUserFriends } from "react-icons/fa";
import { useSelector } from "react-redux";

const Client = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const { total } = useSelector((state) => state.client);
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
      link="/admin/client/add"
      icon={<FaUserFriends className="text-3xl" />}
      title="clients"
      page={page}
      handleSearch={handleSearch}
      handleNextPage={handleNextPage}
      handlePrevPage={handlePrevPage}
      total={total}
      paginate={true}
    >
      <ClientTable page={page} searchKeyword={searchKeyword} />
    </TableWrapper>
  );
};

export default Client;
