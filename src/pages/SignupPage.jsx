import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../store/authStore";
import SignupPg from "../components/auth/Signup";

const Signup = () => {
  const navigate = useNavigate();

  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) return navigate("/");
  }, []);

  return <SignupPg />;
};

export default Signup;
