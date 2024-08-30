import React from "react";
import ViewWrapper from "../../common/ViewWrapper";
import { useParams } from "react-router-dom";
import { categories } from "../../constants";

const CategoryDetails = () => {
  let { id } = useParams();
  console.log("id details from category", id);
  const category = {
    name: "National News",
  };
  return (
    <ViewWrapper id={id}>
      <div className='mx-auto mt-8 rounded-md'>
        <div className='flex gap-6'>
          <aside className='w-1/2 '>
            <h4 className='text-2xl font-bold '>{category.name}</h4>
          </aside>
        </div>
      </div>
    </ViewWrapper>
  );
};

export default CategoryDetails;
