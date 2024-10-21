import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../store/authStore";

export default function Protected({ children, authentication = true }) {
  const authStatus = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const [loader, setLoader] = useState();

  useEffect(() => {
    if (authentication && authStatus !== authentication) navigate("/login");
    else if (!authentication && authStatus !== authentication) navigate("/");

    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
