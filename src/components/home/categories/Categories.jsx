import React from "react";

import CategoryCard from "./CategoryCard.jsx";

const Categories = ({ categories }) => {
  return (
    <div className="mt-10 lg:mt-20">
      <h1 className=" text-left font-bold lg:text-4xl ml-1 text-gray-800">
        Browse by Categories
      </h1>

      <div className=" flex flex-wrap lg:justify-start justify-center lg:gap-10 gap-2 mt-2 lg:mt-5">
        {categories.map((category) => (
          <div
            key={category._id}
            className=" hover:cursor-pointer"
            onClick={""}
          >
            <CategoryCard {...category} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
