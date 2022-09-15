import React, { createContext, ReactNode, useContext, useState } from "react";
import { loadUserInLocalStorage } from '../helpers/LocalStorage';
import { IProduct } from "../types/product.types";
import { IContextData, IUser } from "../types/user.types";

const DataContext = createContext<IContextData>({} as IContextData);

export const useDataContext = () => useContext(DataContext);

type Props = {
  children: ReactNode;
}

export const DataProvider = ({ children }: Props) => {
  const userLocalStorage = loadUserInLocalStorage();

  const [user, setUser] = useState<IUser | undefined>(userLocalStorage);
  const [users, setUsers] = useState<IUser[]>([]);
  const [errors, setErrors] = useState<string>("");
  const [products, setProducts] = useState<IProduct[]>([]);

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
