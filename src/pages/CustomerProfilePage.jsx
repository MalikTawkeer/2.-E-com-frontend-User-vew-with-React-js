import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../store/authStore.js";

const Profile = () => {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/login");
  }, []);

  return <p>progile page</p>;
};

export default Profile;
