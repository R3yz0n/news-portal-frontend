import React from "react";
import CategoryTable from "./CategoryTable";
import TableWrapper from "../../common/TableWrapper";
import { BiSolidCategory } from "react-icons/bi";

const Category = () => {
  return (
    <TableWrapper
      icon={<BiSolidCategory className="text-3xl" />}
      isAddBtnHidden={true}
      link="/admin/category/add"
      title="Categories"
    >
      <CategoryTable />
    </TableWrapper>
  );
};

export default Category;
