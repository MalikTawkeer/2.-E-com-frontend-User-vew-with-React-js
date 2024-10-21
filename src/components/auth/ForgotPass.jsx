import React, { useState } from "react";

import useFetch from "../../hooks/UseFetch";
import Input from "../Input";
import { forgot_pass, apiBaseUrl } from "../../constants/ApiConstants.js";
import axios from "axios";

const Pass = () => {
  const [email, setEmail] = useState("");

  const [data, setData] = useState("");
  const [error, serError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    serError(null);
    setData(null);

    try {
      const response = await axios.post(apiBaseUrl + forgot_pass, {
        email,
      });

      setData(response?.data?.message);
      setLoading(false);
    } catch (error) {
      console.log(error, "ERROR");
      serError(error?.response?.data);
      setLoading(false);
    }
  };

  return (
    <div
      className="mx-auto w-full max-w-lg
        bg-gray-50 rounded-lg pb-10 px-10 pt-3 border-black/10"
    >
      <h2
        className=" text-center text-2xl font-bold
             leading-tight mb-10"
      >
        Forgot password
      </h2>

      <form onSubmit={handleSubmit}>
        <Input
          label="Enter your email  "
          placeholder="Enter email"
          type="email"
          value={email}
          onChange={(e) => setEmail((prevData) => e.target.value)}
        />

        {error && <div className=" text-red-500 font-body p-4">{error}</div>}

        {data && <div className=" text-blue-500 font-body p-4">{data}</div>}

        <button className=" bg-blue-500 hover:bg-blue-400 mt-4 py-1 px-2 rounded-lg text-white">
          {loading ? "Submitting" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Pass;
