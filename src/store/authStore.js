import { create } from "zustand";
import Cookies from "js-cookies";

import useFetch from "../hooks/UseFetch";
import {
  apiBaseUrl,
  signup,
  login,
  forgot_pass,
} from "../constants/ApiConstants";
import axios from "axios";

const useAuthStore = create((set) => ({
  token: Cookies.getItem("token") || null,
  userData: JSON.parse(localStorage.getItem("user")) || null,
  error: null,

  signup: async (name, email, password) => {
    set({ error: null });
    
    try {
      const data = await axios.post(apiBaseUrl + signup, {
        name,
        email,
        password,
        address: {
          city: "kulgam",
          state: "jmnk",
        },
      });

      return data;
    } catch (error) {
      console.log(error?.response?.data?.error, "sadasd");

      set({ error: error?.response?.data?.error || "Sign up failed!" });
    }
  },

  login: async (email, password) => {
    try {
      const data = await axios.post(apiBaseUrl + login, { email, password });

      Cookies.setItem("token", data?.data?.user?.token, { expires: 7 });

      const token = data?.data?.user?.token;
      const user = data?.data?.user;

      set({ token, userData: user, error: null });

      // Store user data in localStorage as a JSON string
      localStorage.setItem("user", JSON.stringify(user));

      return data;
    } catch (error) {
      console.log(error, "sad");

      set({ error: error?.response?.data?.error || "Login failed" });
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = useFetch(forgot_pass, "POST", { email });
      set({ error: null });

      return response;
    } catch (error) {
      set({ error: error?.response?.data?.message || "Erro" });
    }
  },

  logout: () => {
    Cookies.removeItem("token");
    set({ token: null, user: null });
  },
}));

export default useAuthStore;
