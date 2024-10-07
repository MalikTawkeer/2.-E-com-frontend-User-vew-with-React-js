import React from "react";

import DiscountIcon from "../../../assets/DiscountIcon.jsx";

const Discounts = ({ discounts }) => {
  return (
    <div className="mt-10 lg:mt-20">
      <h1 className=" text-left font-bold lg:text-4xl ml-1 text-gray-800">
        Browse by Discounts
      </h1>

      <div className=" flex flex-wrap lg:justify-start justify-center lg:gap-10 gap-2 mt-2 lg:mt-5 ">
        {discounts.map((discount) => (
          <div
            key={discount._id}
            className="relative inline-block hover:cursor-pointer bg-yellow-400 py-2 px-1 rounded-lg h-42 hover:shadow-lg hover:scale-105 duration-300 "
            onClick={""}
          >
            <DiscountIcon /> {/* This will be your icon */}
            {/* Discount value over the icon */}
            <div className="absolute top-8 left-0 w-full h-full flex justify-center">
              <span className=" text-white text-sm font-bold px-2 rounded-full">
                {discount.value}
                {discount.discount_type === "percentage" ? "%" : "₹"} OFF
              </span>
            </div>
            {/* Discount name below the icon */}
            <p className=" text-gray-800 font-bold">
              {discount.discount_name.slice(0, 1).toUpperCase() +
                discount.discount_name.slice(1, discount.discount_name.length)}
            </p>
            {/* <p className="font-mono font-bold text-lg lg:text-3xl">
              {discount.discount_name.slice(0, 1).toUpperCase() +
                discount.discount_name.slice(1, discount.discount_name.length)}
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discounts;
