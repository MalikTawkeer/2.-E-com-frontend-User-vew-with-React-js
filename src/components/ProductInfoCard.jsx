import React from "react";

import DiscountIcon from "../assets/DiscountIcon.jsx";

const Card = ({
  _id,
  name,
  price,
  discount,
  description,
  product_images = [{}],
  stock,
}) => {
  return (
    <div className=" flex flex-col items-center bg-gray-50 py-2 rounded-lg h-[250px] hover:shadow-lg duration-500 cursor-pointer">
      <div className="relative">
        {" "}
        {/* Ensure the parent div has 'relative' for absolute positioning inside */}
        <img
          src={product_images[0]?.url}
          className="w-44 h-44 rounded-md hover:scale-105 duration-500"
          loading="lazy"
          alt={name}
        />
        {discount && (
          <div className="absolute left-3 top-0 bottom-0">
            {/* Position discount icon on top left */}
            <DiscountIcon /> {/* Icon */}
            <div className="absolute top-8 left-0 w-full h-full flex justify-center items-start">
              {" "}
              {/* Align discount value properly */}
              <span className="bg-red-500 text-white text-sm font-bold px-2 rounded-full">
                {discount?.value}
                {discount?.discount_type === "percentage" ? "%" : "₹"} OFF
              </span>
            </div>
          </div>
        )}
      </div>

      <p className=" font-sans font-semibold text-lg lg:text-xl px-2 mt-2">
        {name?.slice(0, 1).toUpperCase() + name?.slice(1, name?.length)}
      </p>
      <p className=" text-sm px-2 mt-1">
        {description?.length > 30
          ? description?.substring(1, 30) + "..."
          : description}
      </p>

      <div className=" flex flex-row gap-6 justify-between items-center px-2 py-2 mt-3">
        <p className=" font-mono font-semibold text-gray-500 text-lg lg:text-xl">
          {"₹" + price}
        </p>
        <button className=" outline outline-[#72ddf7] px-2 py-1 font-bold text-gray-800 rounded-lg hover:outline-black duration-500">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Card;
