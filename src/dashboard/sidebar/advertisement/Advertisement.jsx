import React from "react";
import AdvertisementTable from "./AdvertisementTable";
import TableWrapper from "../../common/TableWrapper";
import { FaAdversal } from "react-icons/fa6";

const Advertisement = () => {
  return (
    <TableWrapper
      icon={<FaAdversal className="text-3xl" />}
      title="Advertisements"
      isAddBtnHidden={true}
    >
      <AdvertisementTable />
    </TableWrapper>
  );
};

export default Advertisement;
