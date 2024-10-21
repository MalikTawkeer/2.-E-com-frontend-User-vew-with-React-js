import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import { apiBaseUrl, reset_pass } from "../constants/ApiConstants";

const Reset = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPassword = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);
    setLoading(true);

    if (password.trim() !== confirmPassword.trim()) {
      setLoading(false);
      return setError("Passwords don't match!");
    }

    if (!token) {
      setLoading(false);
      return setError("Oops!! token not provided!!");
    }

    // API CALL
    try {
      const response = await axios.post(`${apiBaseUrl + reset_pass}/${token}`, {
        newPassword: password,
      });

      setSuccess(response?.data?.message);
      setError(null);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error, "Error while reseting password");
      setError(error?.response?.data?.message);
      setLoading(false);
      navigate("/");
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
        Reset Your password
      </h2>

      <form onSubmit={resetPassword}>
        <Input
          label="Enter new password  "
          placeholder="Enter password "
          type="text"
          value={password}
          onChange={(e) => setPassword((prevData) => e.target.value)}
        />

        <Input
          label="Enter Confirm password  "
          placeholder="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword((prevData) => e.target.value)}
        />

        {error && <div className=" text-red-500 font-body p-4">{error}</div>}

        {success && (
          <div className=" text-blue-500 font-body p-4">{success}</div>
        )}

        <button className=" bg-blue-500 hover:bg-blue-400 mt-4 py-1 px-2 rounded-lg text-white">
          {loading ? "Resetting" : "Reset"}
        </button>
      </form>
    </div>
  );
};

export default Reset;
