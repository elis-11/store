import { IUserCreate, IUserUpdate } from "../types/user.types";

const API_URL = import.meta.env.VITE_API_URL;

console.log({ API_URL });

// *******************USERS**************
// All users
export const getUsersApi = async (token: string) => {
  const response = await fetch(`${API_URL}/users`, {
    // send token to protected route => so API can identify us and allows us access!
    headers: {
      Authorization: token,
    },
  });
  return response.json();
};

// signup
export const signupApi = async (userData: IUserCreate) => {
  console.log(userData);

  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // convert object to string that we can send over the wire!
    body: JSON.stringify(userData),
  });

  return response.json();
};

//login
export const loginApi = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const updateUserApi = async (
  token: string,
  userId: string,
  updateData: IUserUpdate
) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(updateData),
  });
  return response.json();
};
