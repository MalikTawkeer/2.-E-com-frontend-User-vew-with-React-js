import React from "react";

import ProductInfoCard from "../ProductInfoCard.jsx";

const TopSeller = ({ bestSellers }) => {
  return (
    <div className=" mt-10 lg:mt-20">
      <h1 className=" text-left font-bold lg:text-4xl ml-1 text-gray-800">
        Best sellers
      </h1>

      <div className=" flex flex-wrap lg:justify-start justify-center lg:gap-10 gap-2 mt-2 lg:mt-5">
        {bestSellers.map((product) => (
          <ProductInfoCard key={product?._id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default TopSeller;
