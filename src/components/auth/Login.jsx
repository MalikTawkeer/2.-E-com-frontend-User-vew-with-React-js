import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Input from "../Input";
import useAuthStore from "../../store/authStore.js";

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = useAuthStore((state) => state.login);
  const errors = useAuthStore((state) => state.error);
  const token = useAuthStore((state) => state.token);

  const signin = async (data) => {
    setLoading(true);

    // API CALL
    const l = await login(data.email, data.password);
    setLoading(false);

    if (token) navigate("/");
  };

  useEffect(() => {
    if (token) return navigate("/");
  }, []);

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg
        bg-gray-50 rounded-lg p-10 border-black/10`}
      >
        <h2
          className=" text-center text-2xl font-bold
             leading-tight"
        >
          Sign in to ur account
        </h2>

        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className=" font-medium text-primary
                 transition-all duration-200
                 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className=" text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(signin)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Enter an Email  "
              placeholder="Enter email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid",
                },
              })}
            />

            <Input
              label="Enter a password: "
              type="password"
              required="true"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />

            <div className=" text-red-500 font-body">{errors}</div>

            <div className=" flex flex-col justify-center items-center">
              <Link to={"/forgot-pass"} className=" underline text-blue-600">
                Forgot password
              </Link>

              <button
                type="submit"
                className="w-fit bg-blue-400 py-1 px-2 rounded-lg mt-5 shadow-xl hover:bg-gray-400 hover:text-black font-bold"
              >
                {loading ? "Logging In" : "Login In"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
