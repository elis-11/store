import React, { createContext, useContext, useState } from "react";
import { loadUserInLocalStorage } from "../helpers/LocalStorage";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const userLocalStorage = loadUserInLocalStorage();

  const [user, setUser] = useState(userLocalStorage);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState("");
  const [products, setProducts] = useState([]);

  const sharedData = {
    user,
    setUser,
    users,
    setUsers,
    errors,
    setErrors,
    products,
    setProducts,
  };

  return (
    <DataContext.Provider value={sharedData}>{children}</DataContext.Provider>
  );
};
