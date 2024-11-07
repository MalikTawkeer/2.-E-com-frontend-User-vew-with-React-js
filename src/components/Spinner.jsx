import React from "react";

const Spinner = ({ size = 20, color = "text-blue-600" }) => {
  return (
    <div className=" flex flex-row justify-center items-center">
      <div
        className={`animate-spin inline-block border-[3px] border-current border-t-transparent ${color} rounded-full`}
        style={{ width: size, height: size }}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
