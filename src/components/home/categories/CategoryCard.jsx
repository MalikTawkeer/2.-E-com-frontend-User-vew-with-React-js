import React from "react";

const Card = ({ name, description, category_icon }) => {
  return (
    <div className=" flex flex-col justify-center items-center bg-[#72ddf7] px-2 py-2 rounded-lg hover:shadow-lg hover:scale-105 duration-300 w-52">
      <div>
        <img
          src={category_icon}
          alt={name}
          className=" rounded-xl overflow-clip lg:w-42 lg:h-40 "
        />
      </div>

      <p className=" text-gray-900 lg:mt-4 mt-2 font-mono font-bold text-lg lg:text-3xl">
        {name.slice(0, 1).toUpperCase() + name.slice(1, name.length)}
      </p>
    </div>
  );
};

export default Card;
