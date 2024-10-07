import React, { useState, useEffect } from "react";
import axios from "axios";

import { apiBaseUrl } from "../constants/ApiConstants";

const useFetch = (endpoint, method = "GET", body = "") => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      let response = "";

      if ((method = "GET")) {
        response = await axios.get(apiBaseUrl + endpoint);
      } else if (method === "POST") {
        response = await axios.post(apiBaseUrl + endpoint, body);
      } else if (method === "PUT") {
        response = await axios.put(apiBaseUrl + endpoint, body);
      } else if (method === "DELETE") {
        response = await axios.delete(apiBaseUrl + endpoint);
      }

      setData(response.data);
    } catch (error) {
      setError(error.response ? error.response.data : error.message); // error data
    } finally {
      setLoading(false);
    }
  };

  // Execute fetchData only on mount or when url/method/body change
  useEffect(() => {
    fetchData();
  }, [endpoint, method, body]);

  return { data, error, loading };
};

export default useFetch;
