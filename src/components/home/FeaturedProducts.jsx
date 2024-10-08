import React from "react";

import ProductInfoCard from "../ProductInfoCard.jsx";

const Featured = ({ featuredProducts }) => {
  return (
    <div className=" mt-10 lg:mt-20">
      <div className=" flex flex-row justify-between items-center">
        <h1 className=" text-left font-bold lg:text-4xl ml-1 text-gray-800">
          Featured products
        </h1>

        <button className=" font-bold text-gray-800 hover:text-blue-500 duration-500 ">
          See all
        </button>
      </div>

      <div className=" flex flex-wrap lg:justify-start justify-center lg:gap-10 gap-2 mt-2 lg:mt-5">
        {featuredProducts?.slice(0, 15).map((product) => (
          <ProductInfoCard key={product?._id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Featured;
