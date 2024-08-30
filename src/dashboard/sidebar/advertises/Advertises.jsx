import React, { useState } from "react";
import TableWrapper from "../../common/TableWrapper";
import AdvertisesTable from "./AdvertisesTable";
import { RiFileInfoFill } from "react-icons/ri";
import { useSelector } from "react-redux";

const Advertises = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const { total } = useSelector((state) => state.advertises);
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
      icon={<RiFileInfoFill className="text-3xl" />}
      title="Advertises"
      link="/admin/advertises/add"
      page={page}
      handleSearch={handleSearch}
      handleNextPage={handleNextPage}
      handlePrevPage={handlePrevPage}
      total={total}
      paginate={true}
      handleResetPage={handleResetPage}
    >
      <AdvertisesTable page={page} searchKeyword={searchKeyword} />
    </TableWrapper>
  );
};

export default Advertises;
