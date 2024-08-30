// TableRow.js
import React from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const TableRow = ({ data, columns, link }) => {
  return (
    <tr className="bg-white">
      {columns.map((column, columnIndex) => (
        <td key={columnIndex} className="px-6 py-4 whitespace-nowrap">
          {column.field === "icon" ? (
            <Link to={`${link}`}>
              <FaEye className="hover:text-gray-700 hover:scale-125 duration-300 cursor-pointer text-xl " />{" "}
            </Link>
          ) : (
            data[column.field]
          )}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
