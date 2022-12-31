import axios from "axios";
import {IUserCreate } from "../types/user.types";

const API_URL = import.meta.env.VITE_API_URL;

console.log({ API_URL });

axios.defaults.baseURL = API_URL;

//***USERS***
// All users
export const getUsersApi = async (token: string) => {
  const response = await axios.get("/users", {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

// Signup
export const signupApi = async (userData: IUserCreate) => {
  console.log(userData);
  const response = await axios.post("/users", { userData });
  return response.data;
};
