import React from "react";

const Spinner = () => {
  return (
    <div className=" lg:py-20 py-10 flex flex-row justify-center items-center">
      <div
        className="animate-spin inline-block size-20 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500 "
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
