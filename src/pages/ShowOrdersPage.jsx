import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../store/authStore";

const ShowOrders = () => {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/login");
  }, []);

  return <h1>Show Orders</h1>;
};

export default ShowOrders;
